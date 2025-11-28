#!/usr/bin/env python3
"""
엑셀 파일 구조 분석 스크립트
각 엑셀 파일의 시트 구조, 컬럼, 샘플 데이터를 출력합니다.
"""

import pandas as pd
import json
from pathlib import Path

def analyze_excel_file(file_path):
    """엑셀 파일 구조 분석"""
    print(f"\n{'='*80}")
    print(f"[FILE] {file_path.name}")
    print(f"{'='*80}")

    try:
        # 모든 시트 읽기
        excel_file = pd.ExcelFile(file_path)
        print(f"\n[SHEETS] {excel_file.sheet_names}")
        print(f"   Total: {len(excel_file.sheet_names)} sheets")

        # 각 시트 분석
        for sheet_name in excel_file.sheet_names:
            print(f"\n--- Sheet: {sheet_name} ---")
            df = pd.read_excel(file_path, sheet_name=sheet_name)

            print(f"   Size: {df.shape[0]} rows x {df.shape[1]} cols")
            print(f"   Columns: {list(df.columns)}")

            # 샘플 데이터 (처음 3행)
            print(f"\n   Sample Data (first 3 rows):")
            print(df.head(3).to_string(index=False))

            # 데이터 타입
            print(f"\n   Data Types:")
            for col, dtype in df.dtypes.items():
                print(f"      {col}: {dtype}")

    except Exception as e:
        print(f"   [ERROR] {str(e)}")

def main():
    """메인 함수"""
    base_path = Path("기획서/확률정보")

    # 분석할 파일 목록
    files_to_analyze = [
        # 펫 이해도
        "펫이해도/레벨별 획득 가능 옵션 등급 확률.xlsx",
        "펫이해도/종족별 이해도 옵션 획득 확률.xlsx",

        # 영혼 각인 - 옵션부여
        "영혼각인/영혼각인옵션부여확률/무기.xlsx",

        # 영혼 각인 - 수치부여
        "영혼각인/영혼각인수치부여확률/무기.xlsx",

        # 마석/영석
        "마석영석확률/마석영석확률.xlsx",
    ]

    print("=== Excel File Structure Analysis ===")
    print("="*80)

    for file_path in files_to_analyze:
        full_path = base_path / file_path
        if full_path.exists():
            analyze_excel_file(full_path)
        else:
            print(f"\n[ERROR] File not found: {file_path}")

    print(f"\n\n{'='*80}")
    print("=== Analysis Complete ===")
    print("="*80)

if __name__ == "__main__":
    main()
