#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
아이온2 확률 데이터 엑셀 → JSON 변환 스크립트
나중에 확률 정보를 추가할 수 있도록 확장 가능한 구조로 설계
"""

import pandas as pd
import json
from pathlib import Path
from typing import Dict, List, Any
import sys

# UTF-8 출력 설정
sys.stdout.reconfigure(encoding='utf-8')

class ProbabilityConverter:
    """확률 데이터 변환기"""

    def __init__(self, base_path: str = "기획서/확률정보"):
        self.base_path = Path(base_path)
        self.output_path = Path("public/data")
        self.output_path.mkdir(parents=True, exist_ok=True)

    def convert_pet_comprehension(self) -> Dict[str, Any]:
        """펫 이해도 데이터 변환"""
        print("\n" + "="*80)
        print("[1/3] 펫 이해도 변환 시작...")
        print("="*80)

        result = {
            "version": "1.0.0",
            "lastUpdated": "2025-11-28",
            "description": "펫 이해도 시스템 확률 데이터",
            "data": {
                "gradeByLevel": {},
                "optionByGrade": {}
            }
        }

        # 1. 레벨별 등급 확률
        print("\n[Step 1] 레벨별 등급 확률 읽기...")
        grade_file = self.base_path / "펫이해도" / "레벨별 획득 가능 옵션 등급 확률.xlsx"
        df_grade = pd.read_excel(grade_file)

        print(f"   - 총 {len(df_grade)}행 로드")
        print(f"   - 컬럼: {list(df_grade.columns)}")

        # 병합된 셀 처리 (forward fill)
        df_grade['종족'] = df_grade['종족'].ffill()

        # 종족별로 그룹화
        for species in df_grade['종족'].dropna().unique():
            species_data = df_grade[df_grade['종족'] == species]
            result["data"]["gradeByLevel"][species] = {}

            for _, row in species_data.iterrows():
                level = str(int(row['레벨']))
                result["data"]["gradeByLevel"][species][level] = {
                    "일반": float(row['일반']) * 100,  # 0.9 -> 90.0
                    "희귀": float(row['희귀']) * 100,
                    "전승": float(row['전승']) * 100,
                    "유일": float(row['유일']) * 100,
                    "영웅": float(row['영웅']) * 100
                }

            print(f"   ✓ {species} 종족: {len(species_data)}개 레벨 변환 완료")

        # 2. 종족별 옵션 확률
        print("\n[Step 2] 종족별 옵션 확률 읽기...")
        option_file = self.base_path / "펫이해도" / "종족별 이해도 옵션 획득 확률.xlsx"
        df_option = pd.read_excel(option_file)

        print(f"   - 총 {len(df_option)}행 로드")
        print(f"   - 컬럼: {list(df_option.columns)}")

        # 종족별로 그룹화
        current_species = None
        current_slot = None
        current_grade = None

        for _, row in df_option.iterrows():
            # 종족 정보
            if pd.notna(row['종족']):
                current_species = row['종족']
                if current_species not in result["data"]["optionByGrade"]:
                    result["data"]["optionByGrade"][current_species] = {}

            # 슬롯 정보
            if pd.notna(row['슬롯']):
                current_slot = row['슬롯']
                if current_slot not in result["data"]["optionByGrade"][current_species]:
                    result["data"]["optionByGrade"][current_species][current_slot] = {}

            # 등급 정보
            if pd.notna(row['등급']):
                current_grade = row['등급']
                if current_grade not in result["data"]["optionByGrade"][current_species][current_slot]:
                    result["data"]["optionByGrade"][current_species][current_slot][current_grade] = []

            # 옵션 정보
            if pd.notna(row['옵션']) and current_species and current_slot and current_grade:
                option_data = {
                    "name": row['옵션'],
                    "valueRange": row['수치'],
                    "probability": float(row['획득 확률']) * 100  # 0.1666 -> 16.66
                }
                result["data"]["optionByGrade"][current_species][current_slot][current_grade].append(option_data)

        print(f"   ✓ 총 {len(result['data']['optionByGrade'])}개 종족 변환 완료")

        return result

    def convert_soul_engraving(self) -> Dict[str, Any]:
        """영혼 각인 데이터 변환"""
        print("\n" + "="*80)
        print("[2/3] 영혼 각인 변환 시작...")
        print("="*80)

        result = {
            "version": "1.0.0",
            "lastUpdated": "2025-11-28",
            "description": "영혼 각인 시스템 확률 데이터",
            "classes": ["수호성", "호법성", "마도성", "치유성", "궁성", "검성", "살성", "정령성"],
            "data": {
                "weapon": {"optionGrant": {}, "valueGrant": {}},
                "armor": {"optionGrant": {}, "valueGrant": {}},
                "accessory": {"optionGrant": {}, "valueGrant": {}}
            }
        }

        equipment_types = ["무기", "방어구", "장신구"]
        equipment_keys = ["weapon", "armor", "accessory"]

        for eq_type, eq_key in zip(equipment_types, equipment_keys):
            print(f"\n[{eq_type}] 변환 중...")

            # 옵션 부여 확률
            try:
                option_file = self.base_path / "영혼각인" / "영혼각인옵션부여확률" / f"{eq_type}.xlsx"
                df_option = pd.read_excel(option_file)
                print(f"   - 옵션부여: {len(df_option)}행 로드")

                current_grade = None
                current_class = None

                # 컬럼 인덱스로 접근 (한글 인코딩 문제 회피)
                col_names = list(df_option.columns)

                for _, row in df_option.iterrows():
                    # 장비 등급 (0번째 컬럼)
                    if pd.notna(row[col_names[0]]):
                        current_grade = row[col_names[0]]
                        if current_grade not in result["data"][eq_key]["optionGrant"]:
                            result["data"][eq_key]["optionGrant"][current_grade] = {}

                    # 직업 (4번째 컬럼)
                    if pd.notna(row[col_names[4]]):
                        current_class = row[col_names[4]]
                        if current_class not in result["data"][eq_key]["optionGrant"][current_grade]:
                            result["data"][eq_key]["optionGrant"][current_grade][current_class] = []

                    # 옵션 정보
                    if pd.notna(row[col_names[5]]) and current_grade and current_class:
                        option_data = {
                            "optionName": row[col_names[5]],      # 옵션명 (5)
                            "valueRange": row[col_names[6]],      # 수치 값 (6)
                            "probability": float(row[col_names[7]]) * 100,  # 확률 (7)
                            "grantCount": int(row[col_names[2]]) if pd.notna(row[col_names[2]]) else 0,  # 옵션 부여 수량 (2)
                            "maxSkillOptions": int(row[col_names[3]]) if pd.notna(row[col_names[3]]) else 0  # 최대 스킬 옵션 수량 (3)
                        }
                        result["data"][eq_key]["optionGrant"][current_grade][current_class].append(option_data)

                print(f"   ✓ 옵션부여 변환 완료")

            except FileNotFoundError:
                print(f"   ⚠ 옵션부여 파일 없음: {eq_type}.xlsx")

            # 수치 부여 확률
            try:
                value_file = self.base_path / "영혼각인" / "영혼각인수치부여확률" / f"{eq_type}.xlsx"
                df_value = pd.read_excel(value_file)
                print(f"   - 수치부여: {len(df_value)}행 로드")

                current_grade = None
                current_option = None

                # 컬럼 인덱스로 접근
                col_names = list(df_value.columns)

                for _, row in df_value.iterrows():
                    # 헤더 행 스킵 (컬럼명이 데이터에 포함된 경우)
                    if str(row[col_names[2]]) == col_names[2]:
                        continue

                    # 장비 등급 (0번째 컬럼)
                    if pd.notna(row[col_names[0]]):
                        current_grade = row[col_names[0]]
                        if current_grade not in result["data"][eq_key]["valueGrant"]:
                            result["data"][eq_key]["valueGrant"][current_grade] = {}

                    # 옵션명 (1번째 컬럼)
                    if pd.notna(row[col_names[1]]):
                        current_option = row[col_names[1]]
                        if current_option not in result["data"][eq_key]["valueGrant"][current_grade]:
                            result["data"][eq_key]["valueGrant"][current_grade][current_option] = []

                    # 수치 정보
                    if pd.notna(row[col_names[2]]) and current_grade and current_option:
                        try:
                            value_data = {
                                "value": float(row[col_names[2]]),      # 수치 값 (2)
                                "probability": float(row[col_names[3]]) * 100  # 확률 (3)
                            }
                            result["data"][eq_key]["valueGrant"][current_grade][current_option].append(value_data)
                        except (ValueError, TypeError):
                            # 변환 실패 시 스킵
                            continue

                print(f"   ✓ 수치부여 변환 완료")

            except FileNotFoundError:
                print(f"   ⚠ 수치부여 파일 없음: {eq_type}.xlsx")

        return result

    def convert_gemstone(self) -> Dict[str, Any]:
        """마석/영석 데이터 변환"""
        print("\n" + "="*80)
        print("[3/3] 마석/영석 변환 시작...")
        print("="*80)

        result = {
            "version": "1.0.0",
            "lastUpdated": "2025-11-28",
            "description": "마석/영석 각인 확률 데이터",
            "data": {}
        }

        gemstone_file = self.base_path / "마석영석확률" / "마석영석확률.xlsx"
        df = pd.read_excel(gemstone_file)

        print(f"   - 총 {len(df)}행 로드")
        print(f"   - 컬럼: {list(df.columns)}")

        current_equipment = None
        current_stage = None

        # 컬럼 인덱스로 접근
        col_names = list(df.columns)

        for _, row in df.iterrows():
            # 장비등급명 (0번째 컬럼)
            if pd.notna(row[col_names[0]]):
                current_equipment = row[col_names[0]]
                if current_equipment not in result["data"]:
                    result["data"][current_equipment] = {}

            # 단계 (1번째 컬럼)
            if pd.notna(row[col_names[1]]):
                current_stage = row[col_names[1]]
                if current_stage not in result["data"][current_equipment]:
                    result["data"][current_equipment][current_stage] = []

            # 색상/수치 정보
            if pd.notna(row[col_names[3]]) and current_equipment and current_stage:
                gemstone_data = {
                    "grade": row[col_names[2]],  # 확률 (2)
                    "color": row[col_names[3]],  # 색상 (3)
                    "value": int(row[col_names[4]]) if pd.notna(row[col_names[4]]) else 0,  # 수치 (4)
                    "probability": float(row[col_names[5]]) * 100 if pd.notna(row[col_names[5]]) else 0  # 획득 확률 (5)
                }
                result["data"][current_equipment][current_stage].append(gemstone_data)

        print(f"   ✓ 총 {len(result['data'])}개 장비 등급 변환 완료")

        return result

    def save_json(self, data: Dict[str, Any], filename: str):
        """JSON 파일 저장"""

        def json_serial(obj):
            """JSON serializer for objects not serializable by default json code"""
            if hasattr(obj, 'isoformat'):
                return obj.isoformat()
            if isinstance(obj, (pd.Timestamp, pd.Timedelta)):
                return str(obj)
            raise TypeError(f"Type {type(obj)} not serializable")

        output_file = self.output_path / filename
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2, default=json_serial)

        file_size = output_file.stat().st_size
        print(f"\n✓ 저장 완료: {output_file}")
        print(f"  파일 크기: {file_size:,} bytes ({file_size/1024:.1f} KB)")

    def convert_all(self):
        """모든 데이터 변환 실행"""
        print("\n" + "="*80)
        print("🚀 아이온2 확률 데이터 변환 시작")
        print("="*80)
        print(f"입력 경로: {self.base_path}")
        print(f"출력 경로: {self.output_path}")

        try:
            # 1. 펫 이해도
            pet_data = self.convert_pet_comprehension()
            self.save_json(pet_data, "pet-comprehension.json")

            # 2. 영혼 각인
            soul_data = self.convert_soul_engraving()
            self.save_json(soul_data, "soul-engraving.json")

            # 3. 마석/영석
            gem_data = self.convert_gemstone()
            self.save_json(gem_data, "gemstone.json")

            print("\n" + "="*80)
            print("✅ 모든 변환 완료!")
            print("="*80)
            print(f"\n생성된 파일:")
            print(f"  1. public/data/pet-comprehension.json")
            print(f"  2. public/data/soul-engraving.json")
            print(f"  3. public/data/gemstone.json")
            print(f"\n🎯 다음 단계: 검증 스크립트 실행")

        except Exception as e:
            print(f"\n❌ 오류 발생: {str(e)}")
            import traceback
            traceback.print_exc()
            raise

def main():
    converter = ProbabilityConverter()
    converter.convert_all()

if __name__ == "__main__":
    main()
