#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""실제 컬럼명 확인"""

import pandas as pd
from pathlib import Path

files = [
    "기획서/확률정보/영혼각인/영혼각인옵션부여확률/무기.xlsx",
    "기획서/확률정보/영혼각인/영혼각인수치부여확률/무기.xlsx",
    "기획서/확률정보/마석영석확률/마석영석확률.xlsx"
]

for file_path in files:
    print(f"\n{'='*60}")
    print(f"File: {Path(file_path).name}")
    print(f"{'='*60}")
    df = pd.read_excel(file_path)
    print(f"Columns ({len(df.columns)}개):")
    for i, col in enumerate(df.columns, 1):
        print(f"  {i}. '{col}' (type: {df[col].dtype})")
    print(f"\nFirst row:")
    print(df.head(1))
