// 마석/영석 확률 데이터 (자동 생성됨)
// 원본: 기획서/확률정보/마석영석확률/마석영석확률.xlsx

export interface StatOption {
  name: string;
  value: number;
  probability: number;
}

export interface GradeData {
  probability: number;
  stats: StatOption[];
}

export interface ItemData {
  grades: {
    [key: string]: GradeData;
  };
}

export interface ManaStoneData {
  [key: string]: ItemData;
}

export const MANA_STONE_DATA: ManaStoneData = {
  "하급 심연의 마석": {
    "grades": {
      "기본": {
        "probability": 0.5,
        "stats": [
          {
            "name": "공격력",
            "value": 1,
            "probability": 0.03
          },
          {
            "name": "방어력",
            "value": 10,
            "probability": 0.03
          },
          {
            "name": "추가 명중",
            "value": 5,
            "probability": 0.03
          },
          {
            "name": "추가 회피",
            "value": 5,
            "probability": 0.03
          },
          {
            "name": "치명타",
            "value": 5,
            "probability": 0.03
          },
          {
            "name": "치명타 저항",
            "value": 5,
            "probability": 0.03
          },
          {
            "name": "막기",
            "value": 7,
            "probability": 0.05
          },
          {
            "name": "생명력",
            "value": 30,
            "probability": 0.06
          },
          {
            "name": "정신력",
            "value": 15,
            "probability": 0.06
          },
          {
            "name": "PVP 공격력",
            "value": 2,
            "probability": 0.025
          },
          {
            "name": "PVP 방어력",
            "value": 20,
            "probability": 0.025
          },
          {
            "name": "PVP 명중",
            "value": 10,
            "probability": 0.025
          },
          {
            "name": "PVP 회피",
            "value": 10,
            "probability": 0.025
          },
          {
            "name": "PVP 치명타",
            "value": 10,
            "probability": 0.025
          },
          {
            "name": "PVP 치명타 저항",
            "value": 10,
            "probability": 0.025
          }
        ]
      },
      "상급": {
        "probability": 0.35,
        "stats": [
          {
            "name": "공격력",
            "value": 3,
            "probability": 0.021
          },
          {
            "name": "방어력",
            "value": 30,
            "probability": 0.021
          },
          {
            "name": "추가 명중",
            "value": 7,
            "probability": 0.021
          },
          {
            "name": "추가 회피",
            "value": 7,
            "probability": 0.021
          },
          {
            "name": "치명타",
            "value": 7,
            "probability": 0.021
          },
          {
            "name": "치명타 저항",
            "value": 7,
            "probability": 0.021
          },
          {
            "name": "막기",
            "value": 10,
            "probability": 0.035
          },
          {
            "name": "생명력",
            "value": 60,
            "probability": 0.042
          },
          {
            "name": "정신력",
            "value": 30,
            "probability": 0.042
          },
          {
            "name": "PVP 공격력",
            "value": 6,
            "probability": 0.0175
          },
          {
            "name": "PVP 방어력",
            "value": 60,
            "probability": 0.0175
          },
          {
            "name": "PVP 명중",
            "value": 14,
            "probability": 0.0175
          },
          {
            "name": "PVP 회피",
            "value": 14,
            "probability": 0.0175
          },
          {
            "name": "PVP 치명타",
            "value": 14,
            "probability": 0.0175
          },
          {
            "name": "PVP 치명타 저항",
            "value": 14,
            "probability": 0.0175
          }
        ]
      },
      "최상급": {
        "probability": 0.15,
        "stats": [
          {
            "name": "공격력",
            "value": 5,
            "probability": 0.009
          },
          {
            "name": "방어력",
            "value": 50,
            "probability": 0.009
          },
          {
            "name": "추가 명중",
            "value": 10,
            "probability": 0.009
          },
          {
            "name": "추가 회피",
            "value": 10,
            "probability": 0.009
          },
          {
            "name": "치명타",
            "value": 10,
            "probability": 0.009
          },
          {
            "name": "치명타 저항",
            "value": 10,
            "probability": 0.009
          },
          {
            "name": "막기",
            "value": 15,
            "probability": 0.015
          },
          {
            "name": "생명력",
            "value": 100,
            "probability": 0.018
          },
          {
            "name": "정신력",
            "value": 50,
            "probability": 0.018
          },
          {
            "name": "PVP 공격력",
            "value": 10,
            "probability": 0.0075
          },
          {
            "name": "PVP 방어력",
            "value": 100,
            "probability": 0.0075
          },
          {
            "name": "PVP 명중",
            "value": 20,
            "probability": 0.0075
          },
          {
            "name": "PVP 회피",
            "value": 20,
            "probability": 0.0075
          },
          {
            "name": "PVP 치명타",
            "value": 20,
            "probability": 0.0075
          },
          {
            "name": "PVP 치명타 저항",
            "value": 20,
            "probability": 0.0075
          }
        ]
      }
    }
  },
  "중급 심연의 마석": {
    "grades": {
      "기본": {
        "probability": 0.5,
        "stats": [
          {
            "name": "공격력",
            "value": 2,
            "probability": 0.03
          },
          {
            "name": "방어력",
            "value": 20,
            "probability": 0.03
          },
          {
            "name": "추가 명중",
            "value": 6,
            "probability": 0.03
          },
          {
            "name": "추가 회피",
            "value": 6,
            "probability": 0.03
          },
          {
            "name": "치명타",
            "value": 6,
            "probability": 0.03
          },
          {
            "name": "치명타 저항",
            "value": 6,
            "probability": 0.03
          },
          {
            "name": "막기",
            "value": 9,
            "probability": 0.05
          },
          {
            "name": "생명력",
            "value": 45,
            "probability": 0.06
          },
          {
            "name": "정신력",
            "value": 23,
            "probability": 0.06
          },
          {
            "name": "PVP 공격력",
            "value": 4,
            "probability": 0.025
          },
          {
            "name": "PVP 방어력",
            "value": 40,
            "probability": 0.025
          },
          {
            "name": "PVP 명중",
            "value": 12,
            "probability": 0.025
          },
          {
            "name": "PVP 회피",
            "value": 12,
            "probability": 0.025
          },
          {
            "name": "PVP 치명타",
            "value": 12,
            "probability": 0.025
          },
          {
            "name": "PVP 치명타 저항",
            "value": 12,
            "probability": 0.025
          }
        ]
      },
      "상급": {
        "probability": 0.35,
        "stats": [
          {
            "name": "공격력",
            "value": 4,
            "probability": 0.021
          },
          {
            "name": "방어력",
            "value": 40,
            "probability": 0.021
          },
          {
            "name": "추가 명중",
            "value": 9,
            "probability": 0.021
          },
          {
            "name": "추가 회피",
            "value": 9,
            "probability": 0.021
          },
          {
            "name": "치명타",
            "value": 9,
            "probability": 0.021
          },
          {
            "name": "치명타 저항",
            "value": 9,
            "probability": 0.021
          },
          {
            "name": "막기",
            "value": 13,
            "probability": 0.035
          },
          {
            "name": "생명력",
            "value": 80,
            "probability": 0.042
          },
          {
            "name": "정신력",
            "value": 40,
            "probability": 0.042
          },
          {
            "name": "PVP 공격력",
            "value": 8,
            "probability": 0.0175
          },
          {
            "name": "PVP 방어력",
            "value": 80,
            "probability": 0.0175
          },
          {
            "name": "PVP 명중",
            "value": 18,
            "probability": 0.0175
          },
          {
            "name": "PVP 회피",
            "value": 18,
            "probability": 0.0175
          },
          {
            "name": "PVP 치명타",
            "value": 18,
            "probability": 0.0175
          },
          {
            "name": "PVP 치명타 저항",
            "value": 18,
            "probability": 0.0175
          }
        ]
      },
      "최상급": {
        "probability": 0.15,
        "stats": [
          {
            "name": "공격력",
            "value": 8,
            "probability": 0.009
          },
          {
            "name": "방어력",
            "value": 75,
            "probability": 0.009
          },
          {
            "name": "추가 명중",
            "value": 13,
            "probability": 0.009
          },
          {
            "name": "추가 회피",
            "value": 13,
            "probability": 0.009
          },
          {
            "name": "치명타",
            "value": 13,
            "probability": 0.009
          },
          {
            "name": "치명타 저항",
            "value": 13,
            "probability": 0.009
          },
          {
            "name": "막기",
            "value": 18,
            "probability": 0.015
          },
          {
            "name": "생명력",
            "value": 130,
            "probability": 0.018
          },
          {
            "name": "정신력",
            "value": 65,
            "probability": 0.018
          },
          {
            "name": "PVP 공격력",
            "value": 16,
            "probability": 0.0075
          },
          {
            "name": "PVP 방어력",
            "value": 150,
            "probability": 0.0075
          },
          {
            "name": "PVP 명중",
            "value": 26,
            "probability": 0.0075
          },
          {
            "name": "PVP 회피",
            "value": 26,
            "probability": 0.0075
          },
          {
            "name": "PVP 치명타",
            "value": 26,
            "probability": 0.0075
          },
          {
            "name": "PVP 치명타 저항",
            "value": 26,
            "probability": 0.0075
          }
        ]
      }
    }
  },
  "상급 심연의 마석": {
    "grades": {
      "기본": {
        "probability": 0.5,
        "stats": [
          {
            "name": "공격력",
            "value": 3,
            "probability": 0.03
          },
          {
            "name": "방어력",
            "value": 30,
            "probability": 0.03
          },
          {
            "name": "추가 명중",
            "value": 7,
            "probability": 0.03
          },
          {
            "name": "추가 회피",
            "value": 7,
            "probability": 0.03
          },
          {
            "name": "치명타",
            "value": 7,
            "probability": 0.03
          },
          {
            "name": "치명타 저항",
            "value": 7,
            "probability": 0.03
          },
          {
            "name": "막기",
            "value": 10,
            "probability": 0.05
          },
          {
            "name": "생명력",
            "value": 60,
            "probability": 0.06
          },
          {
            "name": "정신력",
            "value": 30,
            "probability": 0.06
          },
          {
            "name": "피해 증폭",
            "value": 10,
            "probability": 0.0025
          },
          {
            "name": "무기 피해 증폭",
            "value": 10,
            "probability": 0.0025
          },
          {
            "name": "치명타 피해 증폭",
            "value": 10,
            "probability": 0.0025
          },
          {
            "name": "후방 피해 증폭",
            "value": 10,
            "probability": 0.0025
          },
          {
            "name": "PVP 공격력",
            "value": 6,
            "probability": 0.0225
          },
          {
            "name": "PVP 방어력",
            "value": 60,
            "probability": 0.0225
          },
          {
            "name": "PVP 명중",
            "value": 14,
            "probability": 0.0225
          },
          {
            "name": "PVP 회피",
            "value": 14,
            "probability": 0.0225
          },
          {
            "name": "PVP 치명타",
            "value": 14,
            "probability": 0.0225
          },
          {
            "name": "PVP 치명타 저항",
            "value": 14,
            "probability": 0.0225
          },
          {
            "name": "PVP 피해 증폭",
            "value": 20,
            "probability": 0.005
          }
        ]
      },
      "상급": {
        "probability": 0.35,
        "stats": [
          {
            "name": "공격력",
            "value": 5,
            "probability": 0.021
          },
          {
            "name": "방어력",
            "value": 50,
            "probability": 0.021
          },
          {
            "name": "추가 명중",
            "value": 10,
            "probability": 0.021
          },
          {
            "name": "추가 회피",
            "value": 10,
            "probability": 0.021
          },
          {
            "name": "치명타",
            "value": 10,
            "probability": 0.021
          },
          {
            "name": "치명타 저항",
            "value": 10,
            "probability": 0.021
          },
          {
            "name": "막기",
            "value": 15,
            "probability": 0.035
          },
          {
            "name": "생명력",
            "value": 100,
            "probability": 0.042
          },
          {
            "name": "정신력",
            "value": 50,
            "probability": 0.042
          },
          {
            "name": "피해 증폭",
            "value": 30,
            "probability": 0.00175
          },
          {
            "name": "무기 피해 증폭",
            "value": 30,
            "probability": 0.00175
          },
          {
            "name": "치명타 피해 증폭",
            "value": 30,
            "probability": 0.00175
          },
          {
            "name": "후방 피해 증폭",
            "value": 30,
            "probability": 0.00175
          },
          {
            "name": "PVP 공격력",
            "value": 10,
            "probability": 0.01575
          },
          {
            "name": "PVP 방어력",
            "value": 100,
            "probability": 0.01575
          },
          {
            "name": "PVP 명중",
            "value": 20,
            "probability": 0.01575
          },
          {
            "name": "PVP 회피",
            "value": 20,
            "probability": 0.01575
          },
          {
            "name": "PVP 치명타",
            "value": 20,
            "probability": 0.01575
          },
          {
            "name": "PVP 치명타 저항",
            "value": 20,
            "probability": 0.01575
          },
          {
            "name": "PVP 피해 증폭",
            "value": 60,
            "probability": 0.0035
          }
        ]
      },
      "최상급": {
        "probability": 0.15,
        "stats": [
          {
            "name": "공격력",
            "value": 10,
            "probability": 0.009
          },
          {
            "name": "방어력",
            "value": 100,
            "probability": 0.009
          },
          {
            "name": "추가 명중",
            "value": 15,
            "probability": 0.009
          },
          {
            "name": "추가 회피",
            "value": 15,
            "probability": 0.009
          },
          {
            "name": "치명타",
            "value": 15,
            "probability": 0.009
          },
          {
            "name": "치명타 저항",
            "value": 15,
            "probability": 0.009
          },
          {
            "name": "막기",
            "value": 20,
            "probability": 0.015
          },
          {
            "name": "생명력",
            "value": 160,
            "probability": 0.018
          },
          {
            "name": "정신력",
            "value": 80,
            "probability": 0.018
          },
          {
            "name": "피해 증폭",
            "value": 100,
            "probability": 0.00075
          },
          {
            "name": "무기 피해 증폭",
            "value": 100,
            "probability": 0.00075
          },
          {
            "name": "치명타 피해 증폭",
            "value": 100,
            "probability": 0.00075
          },
          {
            "name": "후방 피해 증폭",
            "value": 100,
            "probability": 0.00075
          },
          {
            "name": "PVP 공격력",
            "value": 20,
            "probability": 0.00675
          },
          {
            "name": "PVP 방어력",
            "value": 200,
            "probability": 0.00675
          },
          {
            "name": "PVP 명중",
            "value": 30,
            "probability": 0.00675
          },
          {
            "name": "PVP 회피",
            "value": 30,
            "probability": 0.00675
          },
          {
            "name": "PVP 치명타",
            "value": 30,
            "probability": 0.00675
          },
          {
            "name": "PVP 치명타 저항",
            "value": 30,
            "probability": 0.00675
          },
          {
            "name": "PVP 피해 증폭",
            "value": 200,
            "probability": 0.0015
          }
        ]
      }
    }
  },
  "하급 마석": {
    "grades": {
      "기본": {
        "probability": 0.7,
        "stats": [
          {
            "name": "공격력",
            "value": 1,
            "probability": 0.07
          },
          {
            "name": "방어력",
            "value": 10,
            "probability": 0.07
          },
          {
            "name": "추가 명중",
            "value": 5,
            "probability": 0.07
          },
          {
            "name": "추가 회피",
            "value": 5,
            "probability": 0.07
          },
          {
            "name": "치명타",
            "value": 5,
            "probability": 0.07
          },
          {
            "name": "치명타 저항",
            "value": 5,
            "probability": 0.07
          },
          {
            "name": "막기",
            "value": 7,
            "probability": 0.07
          },
          {
            "name": "생명력",
            "value": 30,
            "probability": 0.105
          },
          {
            "name": "정신력",
            "value": 15,
            "probability": 0.105
          }
        ]
      },
      "상급": {
        "probability": 0.3,
        "stats": [
          {
            "name": "공격력",
            "value": 3,
            "probability": 0.03
          },
          {
            "name": "방어력",
            "value": 30,
            "probability": 0.03
          },
          {
            "name": "추가 명중",
            "value": 7,
            "probability": 0.03
          },
          {
            "name": "추가 회피",
            "value": 7,
            "probability": 0.03
          },
          {
            "name": "치명타",
            "value": 7,
            "probability": 0.03
          },
          {
            "name": "치명타 저항",
            "value": 7,
            "probability": 0.03
          },
          {
            "name": "막기",
            "value": 10,
            "probability": 0.03
          },
          {
            "name": "생명력",
            "value": 60,
            "probability": 0.045
          },
          {
            "name": "정신력",
            "value": 30,
            "probability": 0.045
          }
        ]
      }
    }
  },
  "중급 마석": {
    "grades": {
      "기본": {
        "probability": 0.5,
        "stats": [
          {
            "name": "공격력",
            "value": 2,
            "probability": 0.05
          },
          {
            "name": "방어력",
            "value": 20,
            "probability": 0.05
          },
          {
            "name": "추가 명중",
            "value": 6,
            "probability": 0.05
          },
          {
            "name": "추가 회피",
            "value": 6,
            "probability": 0.05
          },
          {
            "name": "치명타",
            "value": 6,
            "probability": 0.05
          },
          {
            "name": "치명타 저항",
            "value": 6,
            "probability": 0.05
          },
          {
            "name": "막기",
            "value": 9,
            "probability": 0.05
          },
          {
            "name": "생명력",
            "value": 45,
            "probability": 0.075
          },
          {
            "name": "정신력",
            "value": 23,
            "probability": 0.075
          }
        ]
      },
      "상급": {
        "probability": 0.35,
        "stats": [
          {
            "name": "공격력",
            "value": 4,
            "probability": 0.035
          },
          {
            "name": "방어력",
            "value": 40,
            "probability": 0.035
          },
          {
            "name": "추가 명중",
            "value": 9,
            "probability": 0.035
          },
          {
            "name": "추가 회피",
            "value": 9,
            "probability": 0.035
          },
          {
            "name": "치명타",
            "value": 9,
            "probability": 0.035
          },
          {
            "name": "치명타 저항",
            "value": 9,
            "probability": 0.035
          },
          {
            "name": "막기",
            "value": 13,
            "probability": 0.035
          },
          {
            "name": "생명력",
            "value": 80,
            "probability": 0.0525
          },
          {
            "name": "정신력",
            "value": 40,
            "probability": 0.0525
          }
        ]
      },
      "최상급": {
        "probability": 0.15,
        "stats": [
          {
            "name": "공격력",
            "value": 8,
            "probability": 0.015
          },
          {
            "name": "방어력",
            "value": 75,
            "probability": 0.015
          },
          {
            "name": "추가 명중",
            "value": 13,
            "probability": 0.015
          },
          {
            "name": "추가 회피",
            "value": 13,
            "probability": 0.015
          },
          {
            "name": "치명타",
            "value": 13,
            "probability": 0.015
          },
          {
            "name": "치명타 저항",
            "value": 13,
            "probability": 0.015
          },
          {
            "name": "막기",
            "value": 18,
            "probability": 0.015
          },
          {
            "name": "생명력",
            "value": 130,
            "probability": 0.0225
          },
          {
            "name": "정신력",
            "value": 65,
            "probability": 0.0225
          }
        ]
      }
    }
  },
  "상급 마석": {
    "grades": {
      "기본": {
        "probability": 0.5,
        "stats": [
          {
            "name": "공격력",
            "value": 3,
            "probability": 0.05
          },
          {
            "name": "방어력",
            "value": 30,
            "probability": 0.05
          },
          {
            "name": "추가 명중",
            "value": 7,
            "probability": 0.05
          },
          {
            "name": "추가 회피",
            "value": 7,
            "probability": 0.05
          },
          {
            "name": "치명타",
            "value": 7,
            "probability": 0.05
          },
          {
            "name": "치명타 저항",
            "value": 7,
            "probability": 0.05
          },
          {
            "name": "막기",
            "value": 10,
            "probability": 0.05
          },
          {
            "name": "생명력",
            "value": 60,
            "probability": 0.07
          },
          {
            "name": "정신력",
            "value": 30,
            "probability": 0.07
          },
          {
            "name": "피해 증폭",
            "value": 10,
            "probability": 0.0025
          },
          {
            "name": "무기 피해 증폭",
            "value": 10,
            "probability": 0.0025
          },
          {
            "name": "치명타 피해 증폭",
            "value": 10,
            "probability": 0.0025
          },
          {
            "name": "후방 피해 증폭",
            "value": 10,
            "probability": 0.0025
          }
        ]
      },
      "상급": {
        "probability": 0.35,
        "stats": [
          {
            "name": "공격력",
            "value": 5,
            "probability": 0.035
          },
          {
            "name": "방어력",
            "value": 50,
            "probability": 0.035
          },
          {
            "name": "추가 명중",
            "value": 10,
            "probability": 0.035
          },
          {
            "name": "추가 회피",
            "value": 10,
            "probability": 0.035
          },
          {
            "name": "치명타",
            "value": 10,
            "probability": 0.035
          },
          {
            "name": "치명타 저항",
            "value": 10,
            "probability": 0.035
          },
          {
            "name": "막기",
            "value": 15,
            "probability": 0.035
          },
          {
            "name": "생명력",
            "value": 100,
            "probability": 0.049
          },
          {
            "name": "정신력",
            "value": 50,
            "probability": 0.049
          },
          {
            "name": "피해 증폭",
            "value": 30,
            "probability": 0.00175
          },
          {
            "name": "무기 피해 증폭",
            "value": 30,
            "probability": 0.00175
          },
          {
            "name": "치명타 피해 증폭",
            "value": 30,
            "probability": 0.00175
          },
          {
            "name": "후방 피해 증폭",
            "value": 30,
            "probability": 0.00175
          }
        ]
      },
      "최상급": {
        "probability": 0.15,
        "stats": [
          {
            "name": "공격력",
            "value": 10,
            "probability": 0.015
          },
          {
            "name": "방어력",
            "value": 100,
            "probability": 0.015
          },
          {
            "name": "추가 명중",
            "value": 15,
            "probability": 0.015
          },
          {
            "name": "추가 회피",
            "value": 15,
            "probability": 0.015
          },
          {
            "name": "치명타",
            "value": 15,
            "probability": 0.015
          },
          {
            "name": "치명타 저항",
            "value": 15,
            "probability": 0.015
          },
          {
            "name": "막기",
            "value": 20,
            "probability": 0.015
          },
          {
            "name": "생명력",
            "value": 160,
            "probability": 0.021
          },
          {
            "name": "정신력",
            "value": 80,
            "probability": 0.021
          },
          {
            "name": "피해 증폭",
            "value": 100,
            "probability": 0.00075
          },
          {
            "name": "무기 피해 증폭",
            "value": 100,
            "probability": 0.00075
          },
          {
            "name": "치명타 피해 증폭",
            "value": 100,
            "probability": 0.00075
          },
          {
            "name": "후방 피해 증폭",
            "value": 100,
            "probability": 0.00075
          }
        ]
      }
    }
  },
  "하급 심연의 영석": {
    "grades": {
      "기본": {
        "probability": 0.5,
        "stats": [
          {
            "name": "공격력",
            "value": 1,
            "probability": 0.03
          },
          {
            "name": "방어력",
            "value": 10,
            "probability": 0.03
          },
          {
            "name": "추가 명중",
            "value": 5,
            "probability": 0.03
          },
          {
            "name": "추가 회피",
            "value": 5,
            "probability": 0.03
          },
          {
            "name": "치명타",
            "value": 5,
            "probability": 0.03
          },
          {
            "name": "치명타 저항",
            "value": 5,
            "probability": 0.03
          },
          {
            "name": "막기",
            "value": 7,
            "probability": 0.05
          },
          {
            "name": "생명력",
            "value": 30,
            "probability": 0.06
          },
          {
            "name": "정신력",
            "value": 15,
            "probability": 0.06
          },
          {
            "name": "PVP 공격력",
            "value": 2,
            "probability": 0.025
          },
          {
            "name": "PVP 방어력",
            "value": 20,
            "probability": 0.025
          },
          {
            "name": "PVP 명중",
            "value": 10,
            "probability": 0.025
          },
          {
            "name": "PVP 회피",
            "value": 10,
            "probability": 0.025
          },
          {
            "name": "PVP 치명타",
            "value": 10,
            "probability": 0.025
          },
          {
            "name": "PVP 치명타 저항",
            "value": 10,
            "probability": 0.025
          }
        ]
      },
      "상급": {
        "probability": 0.35,
        "stats": [
          {
            "name": "공격력",
            "value": 3,
            "probability": 0.021
          },
          {
            "name": "방어력",
            "value": 30,
            "probability": 0.021
          },
          {
            "name": "추가 명중",
            "value": 7,
            "probability": 0.021
          },
          {
            "name": "추가 회피",
            "value": 7,
            "probability": 0.021
          },
          {
            "name": "치명타",
            "value": 7,
            "probability": 0.021
          },
          {
            "name": "치명타 저항",
            "value": 7,
            "probability": 0.021
          },
          {
            "name": "막기",
            "value": 10,
            "probability": 0.035
          },
          {
            "name": "생명력",
            "value": 60,
            "probability": 0.042
          },
          {
            "name": "정신력",
            "value": 30,
            "probability": 0.042
          },
          {
            "name": "PVP 공격력",
            "value": 6,
            "probability": 0.0175
          },
          {
            "name": "PVP 방어력",
            "value": 60,
            "probability": 0.0175
          },
          {
            "name": "PVP 명중",
            "value": 14,
            "probability": 0.0175
          },
          {
            "name": "PVP 회피",
            "value": 14,
            "probability": 0.0175
          },
          {
            "name": "PVP 치명타",
            "value": 14,
            "probability": 0.0175
          },
          {
            "name": "PVP 치명타 저항",
            "value": 14,
            "probability": 0.0175
          }
        ]
      },
      "최상급": {
        "probability": 0.15,
        "stats": [
          {
            "name": "공격력",
            "value": 5,
            "probability": 0.009
          },
          {
            "name": "방어력",
            "value": 50,
            "probability": 0.009
          },
          {
            "name": "추가 명중",
            "value": 10,
            "probability": 0.009
          },
          {
            "name": "추가 회피",
            "value": 10,
            "probability": 0.009
          },
          {
            "name": "치명타",
            "value": 10,
            "probability": 0.009
          },
          {
            "name": "치명타 저항",
            "value": 10,
            "probability": 0.009
          },
          {
            "name": "막기",
            "value": 15,
            "probability": 0.015
          },
          {
            "name": "생명력",
            "value": 100,
            "probability": 0.018
          },
          {
            "name": "정신력",
            "value": 50,
            "probability": 0.018
          },
          {
            "name": "PVP 공격력",
            "value": 10,
            "probability": 0.0075
          },
          {
            "name": "PVP 방어력",
            "value": 100,
            "probability": 0.0075
          },
          {
            "name": "PVP 명중",
            "value": 20,
            "probability": 0.0075
          },
          {
            "name": "PVP 회피",
            "value": 20,
            "probability": 0.0075
          },
          {
            "name": "PVP 치명타",
            "value": 20,
            "probability": 0.0075
          },
          {
            "name": "PVP 치명타 저항",
            "value": 20,
            "probability": 0.0075
          }
        ]
      }
    }
  },
  "중급 심연의 영석": {
    "grades": {
      "기본": {
        "probability": 0.5,
        "stats": [
          {
            "name": "공격력",
            "value": 2,
            "probability": 0.03
          },
          {
            "name": "방어력",
            "value": 20,
            "probability": 0.03
          },
          {
            "name": "추가 명중",
            "value": 6,
            "probability": 0.03
          },
          {
            "name": "추가 회피",
            "value": 6,
            "probability": 0.03
          },
          {
            "name": "치명타",
            "value": 6,
            "probability": 0.03
          },
          {
            "name": "치명타 저항",
            "value": 6,
            "probability": 0.03
          },
          {
            "name": "막기",
            "value": 9,
            "probability": 0.05
          },
          {
            "name": "생명력",
            "value": 45,
            "probability": 0.06
          },
          {
            "name": "정신력",
            "value": 23,
            "probability": 0.06
          },
          {
            "name": "PVP 공격력",
            "value": 4,
            "probability": 0.025
          },
          {
            "name": "PVP 방어력",
            "value": 40,
            "probability": 0.025
          },
          {
            "name": "PVP 명중",
            "value": 12,
            "probability": 0.025
          },
          {
            "name": "PVP 회피",
            "value": 12,
            "probability": 0.025
          },
          {
            "name": "PVP 치명타",
            "value": 12,
            "probability": 0.025
          },
          {
            "name": "PVP 치명타 저항",
            "value": 12,
            "probability": 0.025
          }
        ]
      },
      "상급": {
        "probability": 0.35,
        "stats": [
          {
            "name": "공격력",
            "value": 4,
            "probability": 0.021
          },
          {
            "name": "방어력",
            "value": 40,
            "probability": 0.021
          },
          {
            "name": "추가 명중",
            "value": 9,
            "probability": 0.021
          },
          {
            "name": "추가 회피",
            "value": 9,
            "probability": 0.021
          },
          {
            "name": "치명타",
            "value": 9,
            "probability": 0.021
          },
          {
            "name": "치명타 저항",
            "value": 9,
            "probability": 0.021
          },
          {
            "name": "막기",
            "value": 13,
            "probability": 0.035
          },
          {
            "name": "생명력",
            "value": 80,
            "probability": 0.042
          },
          {
            "name": "정신력",
            "value": 40,
            "probability": 0.042
          },
          {
            "name": "PVP 공격력",
            "value": 8,
            "probability": 0.0175
          },
          {
            "name": "PVP 방어력",
            "value": 80,
            "probability": 0.0175
          },
          {
            "name": "PVP 명중",
            "value": 18,
            "probability": 0.0175
          },
          {
            "name": "PVP 회피",
            "value": 18,
            "probability": 0.0175
          },
          {
            "name": "PVP 치명타",
            "value": 18,
            "probability": 0.0175
          },
          {
            "name": "PVP 치명타 저항",
            "value": 18,
            "probability": 0.0175
          }
        ]
      },
      "최상급": {
        "probability": 0.15,
        "stats": [
          {
            "name": "공격력",
            "value": 8,
            "probability": 0.009
          },
          {
            "name": "방어력",
            "value": 75,
            "probability": 0.009
          },
          {
            "name": "추가 명중",
            "value": 13,
            "probability": 0.009
          },
          {
            "name": "추가 회피",
            "value": 13,
            "probability": 0.009
          },
          {
            "name": "치명타",
            "value": 13,
            "probability": 0.009
          },
          {
            "name": "치명타 저항",
            "value": 13,
            "probability": 0.009
          },
          {
            "name": "막기",
            "value": 18,
            "probability": 0.015
          },
          {
            "name": "생명력",
            "value": 130,
            "probability": 0.018
          },
          {
            "name": "정신력",
            "value": 65,
            "probability": 0.018
          },
          {
            "name": "PVP 공격력",
            "value": 16,
            "probability": 0.0075
          },
          {
            "name": "PVP 방어력",
            "value": 150,
            "probability": 0.0075
          },
          {
            "name": "PVP 명중",
            "value": 26,
            "probability": 0.0075
          },
          {
            "name": "PVP 회피",
            "value": 26,
            "probability": 0.0075
          },
          {
            "name": "PVP 치명타",
            "value": 26,
            "probability": 0.0075
          },
          {
            "name": "PVP 치명타 저항",
            "value": 26,
            "probability": 0.0075
          }
        ]
      }
    }
  },
  "상급 심연의 영석": {
    "grades": {
      "기본": {
        "probability": 0.5,
        "stats": [
          {
            "name": "공격력",
            "value": 3,
            "probability": 0.03
          },
          {
            "name": "방어력",
            "value": 30,
            "probability": 0.03
          },
          {
            "name": "추가 명중",
            "value": 7,
            "probability": 0.03
          },
          {
            "name": "추가 회피",
            "value": 7,
            "probability": 0.03
          },
          {
            "name": "치명타",
            "value": 7,
            "probability": 0.03
          },
          {
            "name": "치명타 저항",
            "value": 7,
            "probability": 0.03
          },
          {
            "name": "막기",
            "value": 10,
            "probability": 0.05
          },
          {
            "name": "생명력",
            "value": 60,
            "probability": 0.06
          },
          {
            "name": "정신력",
            "value": 30,
            "probability": 0.06
          },
          {
            "name": "피해 증폭",
            "value": 10,
            "probability": 0.0025
          },
          {
            "name": "무기 피해 증폭",
            "value": 10,
            "probability": 0.0025
          },
          {
            "name": "치명타 피해 증폭",
            "value": 10,
            "probability": 0.0025
          },
          {
            "name": "후방 피해 증폭",
            "value": 10,
            "probability": 0.0025
          },
          {
            "name": "PVP 공격력",
            "value": 6,
            "probability": 0.0225
          },
          {
            "name": "PVP 방어력",
            "value": 60,
            "probability": 0.0225
          },
          {
            "name": "PVP 명중",
            "value": 14,
            "probability": 0.0225
          },
          {
            "name": "PVP 회피",
            "value": 14,
            "probability": 0.0225
          },
          {
            "name": "PVP 치명타",
            "value": 14,
            "probability": 0.0225
          },
          {
            "name": "PVP 치명타 저항",
            "value": 14,
            "probability": 0.0225
          },
          {
            "name": "PVP 피해 증폭",
            "value": 20,
            "probability": 0.005
          }
        ]
      },
      "상급": {
        "probability": 0.35,
        "stats": [
          {
            "name": "공격력",
            "value": 5,
            "probability": 0.021
          },
          {
            "name": "방어력",
            "value": 50,
            "probability": 0.021
          },
          {
            "name": "추가 명중",
            "value": 10,
            "probability": 0.021
          },
          {
            "name": "추가 회피",
            "value": 10,
            "probability": 0.021
          },
          {
            "name": "치명타",
            "value": 10,
            "probability": 0.021
          },
          {
            "name": "치명타 저항",
            "value": 10,
            "probability": 0.021
          },
          {
            "name": "막기",
            "value": 15,
            "probability": 0.035
          },
          {
            "name": "생명력",
            "value": 100,
            "probability": 0.042
          },
          {
            "name": "정신력",
            "value": 50,
            "probability": 0.042
          },
          {
            "name": "피해 증폭",
            "value": 30,
            "probability": 0.00175
          },
          {
            "name": "무기 피해 증폭",
            "value": 30,
            "probability": 0.00175
          },
          {
            "name": "치명타 피해 증폭",
            "value": 30,
            "probability": 0.00175
          },
          {
            "name": "후방 피해 증폭",
            "value": 30,
            "probability": 0.00175
          },
          {
            "name": "PVP 공격력",
            "value": 10,
            "probability": 0.01575
          },
          {
            "name": "PVP 방어력",
            "value": 100,
            "probability": 0.01575
          },
          {
            "name": "PVP 명중",
            "value": 20,
            "probability": 0.01575
          },
          {
            "name": "PVP 회피",
            "value": 20,
            "probability": 0.01575
          },
          {
            "name": "PVP 치명타",
            "value": 20,
            "probability": 0.01575
          },
          {
            "name": "PVP 치명타 저항",
            "value": 20,
            "probability": 0.01575
          },
          {
            "name": "PVP 피해 증폭",
            "value": 60,
            "probability": 0.0035
          }
        ]
      },
      "최상급": {
        "probability": 0.15,
        "stats": [
          {
            "name": "공격력",
            "value": 10,
            "probability": 0.009
          },
          {
            "name": "방어력",
            "value": 100,
            "probability": 0.009
          },
          {
            "name": "추가 명중",
            "value": 15,
            "probability": 0.009
          },
          {
            "name": "추가 회피",
            "value": 15,
            "probability": 0.009
          },
          {
            "name": "치명타",
            "value": 15,
            "probability": 0.009
          },
          {
            "name": "치명타 저항",
            "value": 15,
            "probability": 0.009
          },
          {
            "name": "막기",
            "value": 20,
            "probability": 0.015
          },
          {
            "name": "생명력",
            "value": 160,
            "probability": 0.018
          },
          {
            "name": "정신력",
            "value": 80,
            "probability": 0.018
          },
          {
            "name": "피해 증폭",
            "value": 100,
            "probability": 0.00075
          },
          {
            "name": "무기 피해 증폭",
            "value": 100,
            "probability": 0.00075
          },
          {
            "name": "치명타 피해 증폭",
            "value": 100,
            "probability": 0.00075
          },
          {
            "name": "후방 피해 증폭",
            "value": 100,
            "probability": 0.00075
          },
          {
            "name": "PVP 공격력",
            "value": 20,
            "probability": 0.00675
          },
          {
            "name": "PVP 방어력",
            "value": 200,
            "probability": 0.00675
          },
          {
            "name": "PVP 명중",
            "value": 30,
            "probability": 0.00675
          },
          {
            "name": "PVP 회피",
            "value": 30,
            "probability": 0.00675
          },
          {
            "name": "PVP 치명타",
            "value": 30,
            "probability": 0.00675
          },
          {
            "name": "PVP 치명타 저항",
            "value": 30,
            "probability": 0.00675
          },
          {
            "name": "PVP 피해 증폭",
            "value": 200,
            "probability": 0.0015
          }
        ]
      }
    }
  },
  "하급 영석": {
    "grades": {
      "기본": {
        "probability": 0.7,
        "stats": [
          {
            "name": "공격력",
            "value": 1,
            "probability": 0.07
          },
          {
            "name": "방어력",
            "value": 10,
            "probability": 0.07
          },
          {
            "name": "추가 명중",
            "value": 5,
            "probability": 0.07
          },
          {
            "name": "추가 회피",
            "value": 5,
            "probability": 0.07
          },
          {
            "name": "치명타",
            "value": 5,
            "probability": 0.07
          },
          {
            "name": "치명타 저항",
            "value": 5,
            "probability": 0.07
          },
          {
            "name": "막기",
            "value": 7,
            "probability": 0.07
          },
          {
            "name": "생명력",
            "value": 30,
            "probability": 0.105
          },
          {
            "name": "정신력",
            "value": 15,
            "probability": 0.105
          }
        ]
      },
      "상급": {
        "probability": 0.3,
        "stats": [
          {
            "name": "공격력",
            "value": 3,
            "probability": 0.03
          },
          {
            "name": "방어력",
            "value": 30,
            "probability": 0.03
          },
          {
            "name": "추가 명중",
            "value": 7,
            "probability": 0.03
          },
          {
            "name": "추가 회피",
            "value": 7,
            "probability": 0.03
          },
          {
            "name": "치명타",
            "value": 7,
            "probability": 0.03
          },
          {
            "name": "치명타 저항",
            "value": 7,
            "probability": 0.03
          },
          {
            "name": "막기",
            "value": 10,
            "probability": 0.03
          },
          {
            "name": "생명력",
            "value": 60,
            "probability": 0.045
          },
          {
            "name": "정신력",
            "value": 30,
            "probability": 0.045
          }
        ]
      }
    }
  },
  "중급 영석": {
    "grades": {
      "기본": {
        "probability": 0.5,
        "stats": [
          {
            "name": "공격력",
            "value": 2,
            "probability": 0.05
          },
          {
            "name": "방어력",
            "value": 20,
            "probability": 0.05
          },
          {
            "name": "추가 명중",
            "value": 6,
            "probability": 0.05
          },
          {
            "name": "추가 회피",
            "value": 6,
            "probability": 0.05
          },
          {
            "name": "치명타",
            "value": 6,
            "probability": 0.05
          },
          {
            "name": "치명타 저항",
            "value": 6,
            "probability": 0.05
          },
          {
            "name": "막기",
            "value": 9,
            "probability": 0.05
          },
          {
            "name": "생명력",
            "value": 45,
            "probability": 0.075
          },
          {
            "name": "정신력",
            "value": 23,
            "probability": 0.075
          }
        ]
      },
      "상급": {
        "probability": 0.35,
        "stats": [
          {
            "name": "공격력",
            "value": 4,
            "probability": 0.035
          },
          {
            "name": "방어력",
            "value": 40,
            "probability": 0.035
          },
          {
            "name": "추가 명중",
            "value": 9,
            "probability": 0.035
          },
          {
            "name": "추가 회피",
            "value": 9,
            "probability": 0.035
          },
          {
            "name": "치명타",
            "value": 9,
            "probability": 0.035
          },
          {
            "name": "치명타 저항",
            "value": 9,
            "probability": 0.035
          },
          {
            "name": "막기",
            "value": 13,
            "probability": 0.035
          },
          {
            "name": "생명력",
            "value": 80,
            "probability": 0.0525
          },
          {
            "name": "정신력",
            "value": 40,
            "probability": 0.0525
          }
        ]
      },
      "최상급": {
        "probability": 0.15,
        "stats": [
          {
            "name": "공격력",
            "value": 8,
            "probability": 0.015
          },
          {
            "name": "방어력",
            "value": 75,
            "probability": 0.015
          },
          {
            "name": "추가 명중",
            "value": 13,
            "probability": 0.015
          },
          {
            "name": "추가 회피",
            "value": 13,
            "probability": 0.015
          },
          {
            "name": "치명타",
            "value": 13,
            "probability": 0.015
          },
          {
            "name": "치명타 저항",
            "value": 13,
            "probability": 0.015
          },
          {
            "name": "막기",
            "value": 18,
            "probability": 0.015
          },
          {
            "name": "생명력",
            "value": 130,
            "probability": 0.0225
          },
          {
            "name": "정신력",
            "value": 65,
            "probability": 0.0225
          }
        ]
      }
    }
  },
  "상급 영석": {
    "grades": {
      "기본": {
        "probability": 0.5,
        "stats": [
          {
            "name": "공격력",
            "value": 3,
            "probability": 0.05
          },
          {
            "name": "방어력",
            "value": 30,
            "probability": 0.05
          },
          {
            "name": "추가 명중",
            "value": 7,
            "probability": 0.05
          },
          {
            "name": "추가 회피",
            "value": 7,
            "probability": 0.05
          },
          {
            "name": "치명타",
            "value": 7,
            "probability": 0.05
          },
          {
            "name": "치명타 저항",
            "value": 7,
            "probability": 0.05
          },
          {
            "name": "막기",
            "value": 10,
            "probability": 0.05
          },
          {
            "name": "생명력",
            "value": 60,
            "probability": 0.07
          },
          {
            "name": "정신력",
            "value": 30,
            "probability": 0.07
          },
          {
            "name": "피해 증폭",
            "value": 10,
            "probability": 0.0025
          },
          {
            "name": "무기 피해 증폭",
            "value": 10,
            "probability": 0.0025
          },
          {
            "name": "치명타 피해 증폭",
            "value": 10,
            "probability": 0.0025
          },
          {
            "name": "후방 피해 증폭",
            "value": 10,
            "probability": 0.0025
          }
        ]
      },
      "상급": {
        "probability": 0.35,
        "stats": [
          {
            "name": "공격력",
            "value": 5,
            "probability": 0.035
          },
          {
            "name": "방어력",
            "value": 50,
            "probability": 0.035
          },
          {
            "name": "추가 명중",
            "value": 10,
            "probability": 0.035
          },
          {
            "name": "추가 회피",
            "value": 10,
            "probability": 0.035
          },
          {
            "name": "치명타",
            "value": 10,
            "probability": 0.035
          },
          {
            "name": "치명타 저항",
            "value": 10,
            "probability": 0.035
          },
          {
            "name": "막기",
            "value": 15,
            "probability": 0.035
          },
          {
            "name": "생명력",
            "value": 100,
            "probability": 0.049
          },
          {
            "name": "정신력",
            "value": 50,
            "probability": 0.049
          },
          {
            "name": "피해 증폭",
            "value": 30,
            "probability": 0.00175
          },
          {
            "name": "무기 피해 증폭",
            "value": 30,
            "probability": 0.00175
          },
          {
            "name": "치명타 피해 증폭",
            "value": 30,
            "probability": 0.00175
          },
          {
            "name": "후방 피해 증폭",
            "value": 30,
            "probability": 0.00175
          }
        ]
      },
      "최상급": {
        "probability": 0.15,
        "stats": [
          {
            "name": "공격력",
            "value": 10,
            "probability": 0.015
          },
          {
            "name": "방어력",
            "value": 100,
            "probability": 0.015
          },
          {
            "name": "추가 명중",
            "value": 15,
            "probability": 0.015
          },
          {
            "name": "추가 회피",
            "value": 15,
            "probability": 0.015
          },
          {
            "name": "치명타",
            "value": 15,
            "probability": 0.015
          },
          {
            "name": "치명타 저항",
            "value": 15,
            "probability": 0.015
          },
          {
            "name": "막기",
            "value": 20,
            "probability": 0.015
          },
          {
            "name": "생명력",
            "value": 160,
            "probability": 0.021
          },
          {
            "name": "정신력",
            "value": 80,
            "probability": 0.021
          },
          {
            "name": "피해 증폭",
            "value": 100,
            "probability": 0.00075
          },
          {
            "name": "무기 피해 증폭",
            "value": 100,
            "probability": 0.00075
          },
          {
            "name": "치명타 피해 증폭",
            "value": 100,
            "probability": 0.00075
          },
          {
            "name": "후방 피해 증폭",
            "value": 100,
            "probability": 0.00075
          }
        ]
      }
    }
  },
  "하급 심연의 마석 (각인)": {
    "grades": {
      "기본": {
        "probability": 0.5,
        "stats": [
          {
            "name": "공격력",
            "value": 1,
            "probability": 0.03
          },
          {
            "name": "방어력",
            "value": 10,
            "probability": 0.03
          },
          {
            "name": "추가 명중",
            "value": 5,
            "probability": 0.03
          },
          {
            "name": "추가 회피",
            "value": 5,
            "probability": 0.03
          },
          {
            "name": "치명타",
            "value": 5,
            "probability": 0.03
          },
          {
            "name": "치명타 저항",
            "value": 5,
            "probability": 0.03
          },
          {
            "name": "막기",
            "value": 7,
            "probability": 0.05
          },
          {
            "name": "생명력",
            "value": 30,
            "probability": 0.06
          },
          {
            "name": "정신력",
            "value": 15,
            "probability": 0.06
          },
          {
            "name": "PVP 공격력",
            "value": 2,
            "probability": 0.025
          },
          {
            "name": "PVP 방어력",
            "value": 20,
            "probability": 0.025
          },
          {
            "name": "PVP 명중",
            "value": 10,
            "probability": 0.025
          },
          {
            "name": "PVP 회피",
            "value": 10,
            "probability": 0.025
          },
          {
            "name": "PVP 치명타",
            "value": 10,
            "probability": 0.025
          },
          {
            "name": "PVP 치명타 저항",
            "value": 10,
            "probability": 0.025
          }
        ]
      },
      "상급": {
        "probability": 0.35,
        "stats": [
          {
            "name": "공격력",
            "value": 3,
            "probability": 0.021
          },
          {
            "name": "방어력",
            "value": 30,
            "probability": 0.021
          },
          {
            "name": "추가 명중",
            "value": 7,
            "probability": 0.021
          },
          {
            "name": "추가 회피",
            "value": 7,
            "probability": 0.021
          },
          {
            "name": "치명타",
            "value": 7,
            "probability": 0.021
          },
          {
            "name": "치명타 저항",
            "value": 7,
            "probability": 0.021
          },
          {
            "name": "막기",
            "value": 10,
            "probability": 0.035
          },
          {
            "name": "생명력",
            "value": 60,
            "probability": 0.042
          },
          {
            "name": "정신력",
            "value": 30,
            "probability": 0.042
          },
          {
            "name": "PVP 공격력",
            "value": 6,
            "probability": 0.0175
          },
          {
            "name": "PVP 방어력",
            "value": 60,
            "probability": 0.0175
          },
          {
            "name": "PVP 명중",
            "value": 14,
            "probability": 0.0175
          },
          {
            "name": "PVP 회피",
            "value": 14,
            "probability": 0.0175
          },
          {
            "name": "PVP 치명타",
            "value": 14,
            "probability": 0.0175
          },
          {
            "name": "PVP 치명타 저항",
            "value": 14,
            "probability": 0.0175
          }
        ]
      },
      "최상급": {
        "probability": 0.15,
        "stats": [
          {
            "name": "공격력",
            "value": 5,
            "probability": 0.009
          },
          {
            "name": "방어력",
            "value": 50,
            "probability": 0.009
          },
          {
            "name": "추가 명중",
            "value": 10,
            "probability": 0.009
          },
          {
            "name": "추가 회피",
            "value": 10,
            "probability": 0.009
          },
          {
            "name": "치명타",
            "value": 10,
            "probability": 0.009
          },
          {
            "name": "치명타 저항",
            "value": 10,
            "probability": 0.009
          },
          {
            "name": "막기",
            "value": 15,
            "probability": 0.015
          },
          {
            "name": "생명력",
            "value": 100,
            "probability": 0.018
          },
          {
            "name": "정신력",
            "value": 50,
            "probability": 0.018
          },
          {
            "name": "PVP 공격력",
            "value": 10,
            "probability": 0.0075
          },
          {
            "name": "PVP 방어력",
            "value": 100,
            "probability": 0.0075
          },
          {
            "name": "PVP 명중",
            "value": 20,
            "probability": 0.0075
          },
          {
            "name": "PVP 회피",
            "value": 20,
            "probability": 0.0075
          },
          {
            "name": "PVP 치명타",
            "value": 20,
            "probability": 0.0075
          },
          {
            "name": "PVP 치명타 저항",
            "value": 20,
            "probability": 0.0075
          }
        ]
      }
    }
  },
  "중급 심연의 마석 (각인)": {
    "grades": {
      "기본": {
        "probability": 0.5,
        "stats": [
          {
            "name": "공격력",
            "value": 2,
            "probability": 0.03
          },
          {
            "name": "방어력",
            "value": 20,
            "probability": 0.03
          },
          {
            "name": "추가 명중",
            "value": 6,
            "probability": 0.03
          },
          {
            "name": "추가 회피",
            "value": 6,
            "probability": 0.03
          },
          {
            "name": "치명타",
            "value": 6,
            "probability": 0.03
          },
          {
            "name": "치명타 저항",
            "value": 6,
            "probability": 0.03
          },
          {
            "name": "막기",
            "value": 9,
            "probability": 0.05
          },
          {
            "name": "생명력",
            "value": 45,
            "probability": 0.06
          },
          {
            "name": "정신력",
            "value": 23,
            "probability": 0.06
          },
          {
            "name": "PVP 공격력",
            "value": 4,
            "probability": 0.025
          },
          {
            "name": "PVP 방어력",
            "value": 40,
            "probability": 0.025
          },
          {
            "name": "PVP 명중",
            "value": 12,
            "probability": 0.025
          },
          {
            "name": "PVP 회피",
            "value": 12,
            "probability": 0.025
          },
          {
            "name": "PVP 치명타",
            "value": 12,
            "probability": 0.025
          },
          {
            "name": "PVP 치명타 저항",
            "value": 12,
            "probability": 0.025
          }
        ]
      },
      "상급": {
        "probability": 0.35,
        "stats": [
          {
            "name": "공격력",
            "value": 4,
            "probability": 0.021
          },
          {
            "name": "방어력",
            "value": 40,
            "probability": 0.021
          },
          {
            "name": "추가 명중",
            "value": 9,
            "probability": 0.021
          },
          {
            "name": "추가 회피",
            "value": 9,
            "probability": 0.021
          },
          {
            "name": "치명타",
            "value": 9,
            "probability": 0.021
          },
          {
            "name": "치명타 저항",
            "value": 9,
            "probability": 0.021
          },
          {
            "name": "막기",
            "value": 13,
            "probability": 0.035
          },
          {
            "name": "생명력",
            "value": 80,
            "probability": 0.042
          },
          {
            "name": "정신력",
            "value": 40,
            "probability": 0.042
          },
          {
            "name": "PVP 공격력",
            "value": 8,
            "probability": 0.0175
          },
          {
            "name": "PVP 방어력",
            "value": 80,
            "probability": 0.0175
          },
          {
            "name": "PVP 명중",
            "value": 18,
            "probability": 0.0175
          },
          {
            "name": "PVP 회피",
            "value": 18,
            "probability": 0.0175
          },
          {
            "name": "PVP 치명타",
            "value": 18,
            "probability": 0.0175
          },
          {
            "name": "PVP 치명타 저항",
            "value": 18,
            "probability": 0.0175
          }
        ]
      },
      "최상급": {
        "probability": 0.15,
        "stats": [
          {
            "name": "공격력",
            "value": 8,
            "probability": 0.009
          },
          {
            "name": "방어력",
            "value": 75,
            "probability": 0.009
          },
          {
            "name": "추가 명중",
            "value": 13,
            "probability": 0.009
          },
          {
            "name": "추가 회피",
            "value": 13,
            "probability": 0.009
          },
          {
            "name": "치명타",
            "value": 13,
            "probability": 0.009
          },
          {
            "name": "치명타 저항",
            "value": 13,
            "probability": 0.009
          },
          {
            "name": "막기",
            "value": 18,
            "probability": 0.015
          },
          {
            "name": "생명력",
            "value": 130,
            "probability": 0.018
          },
          {
            "name": "정신력",
            "value": 65,
            "probability": 0.018
          },
          {
            "name": "PVP 공격력",
            "value": 16,
            "probability": 0.0075
          },
          {
            "name": "PVP 방어력",
            "value": 150,
            "probability": 0.0075
          },
          {
            "name": "PVP 명중",
            "value": 26,
            "probability": 0.0075
          },
          {
            "name": "PVP 회피",
            "value": 26,
            "probability": 0.0075
          },
          {
            "name": "PVP 치명타",
            "value": 26,
            "probability": 0.0075
          },
          {
            "name": "PVP 치명타 저항",
            "value": 26,
            "probability": 0.0075
          }
        ]
      }
    }
  },
  "상급 심연의 마석 (각인)": {
    "grades": {
      "기본": {
        "probability": 0.5,
        "stats": [
          {
            "name": "공격력",
            "value": 3,
            "probability": 0.03
          },
          {
            "name": "방어력",
            "value": 30,
            "probability": 0.03
          },
          {
            "name": "추가 명중",
            "value": 7,
            "probability": 0.03
          },
          {
            "name": "추가 회피",
            "value": 7,
            "probability": 0.03
          },
          {
            "name": "치명타",
            "value": 7,
            "probability": 0.03
          },
          {
            "name": "치명타 저항",
            "value": 7,
            "probability": 0.03
          },
          {
            "name": "막기",
            "value": 10,
            "probability": 0.05
          },
          {
            "name": "생명력",
            "value": 60,
            "probability": 0.06
          },
          {
            "name": "정신력",
            "value": 30,
            "probability": 0.06
          },
          {
            "name": "피해 증폭",
            "value": 10,
            "probability": 0.0025
          },
          {
            "name": "무기 피해 증폭",
            "value": 10,
            "probability": 0.0025
          },
          {
            "name": "치명타 피해 증폭",
            "value": 10,
            "probability": 0.0025
          },
          {
            "name": "후방 피해 증폭",
            "value": 10,
            "probability": 0.0025
          },
          {
            "name": "PVP 공격력",
            "value": 6,
            "probability": 0.0225
          },
          {
            "name": "PVP 방어력",
            "value": 60,
            "probability": 0.0225
          },
          {
            "name": "PVP 명중",
            "value": 14,
            "probability": 0.0225
          },
          {
            "name": "PVP 회피",
            "value": 14,
            "probability": 0.0225
          },
          {
            "name": "PVP 치명타",
            "value": 14,
            "probability": 0.0225
          },
          {
            "name": "PVP 치명타 저항",
            "value": 14,
            "probability": 0.0225
          },
          {
            "name": "PVP 피해 증폭",
            "value": 20,
            "probability": 0.005
          }
        ]
      },
      "상급": {
        "probability": 0.35,
        "stats": [
          {
            "name": "공격력",
            "value": 5,
            "probability": 0.021
          },
          {
            "name": "방어력",
            "value": 50,
            "probability": 0.021
          },
          {
            "name": "추가 명중",
            "value": 10,
            "probability": 0.021
          },
          {
            "name": "추가 회피",
            "value": 10,
            "probability": 0.021
          },
          {
            "name": "치명타",
            "value": 10,
            "probability": 0.021
          },
          {
            "name": "치명타 저항",
            "value": 10,
            "probability": 0.021
          },
          {
            "name": "막기",
            "value": 15,
            "probability": 0.035
          },
          {
            "name": "생명력",
            "value": 100,
            "probability": 0.042
          },
          {
            "name": "정신력",
            "value": 50,
            "probability": 0.042
          },
          {
            "name": "피해 증폭",
            "value": 30,
            "probability": 0.00175
          },
          {
            "name": "무기 피해 증폭",
            "value": 30,
            "probability": 0.00175
          },
          {
            "name": "치명타 피해 증폭",
            "value": 30,
            "probability": 0.00175
          },
          {
            "name": "후방 피해 증폭",
            "value": 30,
            "probability": 0.00175
          },
          {
            "name": "PVP 공격력",
            "value": 10,
            "probability": 0.01575
          },
          {
            "name": "PVP 방어력",
            "value": 100,
            "probability": 0.01575
          },
          {
            "name": "PVP 명중",
            "value": 20,
            "probability": 0.01575
          },
          {
            "name": "PVP 회피",
            "value": 20,
            "probability": 0.01575
          },
          {
            "name": "PVP 치명타",
            "value": 20,
            "probability": 0.01575
          },
          {
            "name": "PVP 치명타 저항",
            "value": 20,
            "probability": 0.01575
          },
          {
            "name": "PVP 피해 증폭",
            "value": 60,
            "probability": 0.0035
          }
        ]
      },
      "최상급": {
        "probability": 0.15,
        "stats": [
          {
            "name": "공격력",
            "value": 10,
            "probability": 0.009
          },
          {
            "name": "방어력",
            "value": 100,
            "probability": 0.009
          },
          {
            "name": "추가 명중",
            "value": 15,
            "probability": 0.009
          },
          {
            "name": "추가 회피",
            "value": 15,
            "probability": 0.009
          },
          {
            "name": "치명타",
            "value": 15,
            "probability": 0.009
          },
          {
            "name": "치명타 저항",
            "value": 15,
            "probability": 0.009
          },
          {
            "name": "막기",
            "value": 20,
            "probability": 0.015
          },
          {
            "name": "생명력",
            "value": 160,
            "probability": 0.018
          },
          {
            "name": "정신력",
            "value": 80,
            "probability": 0.018
          },
          {
            "name": "피해 증폭",
            "value": 100,
            "probability": 0.00075
          },
          {
            "name": "무기 피해 증폭",
            "value": 100,
            "probability": 0.00075
          },
          {
            "name": "치명타 피해 증폭",
            "value": 100,
            "probability": 0.00075
          },
          {
            "name": "후방 피해 증폭",
            "value": 100,
            "probability": 0.00075
          },
          {
            "name": "PVP 공격력",
            "value": 20,
            "probability": 0.00675
          },
          {
            "name": "PVP 방어력",
            "value": 200,
            "probability": 0.00675
          },
          {
            "name": "PVP 명중",
            "value": 30,
            "probability": 0.00675
          },
          {
            "name": "PVP 회피",
            "value": 30,
            "probability": 0.00675
          },
          {
            "name": "PVP 치명타",
            "value": 30,
            "probability": 0.00675
          },
          {
            "name": "PVP 치명타 저항",
            "value": 30,
            "probability": 0.00675
          },
          {
            "name": "PVP 피해 증폭",
            "value": 200,
            "probability": 0.0015
          }
        ]
      }
    }
  },
  "하급 마석 (각인)": {
    "grades": {
      "기본": {
        "probability": 0.7,
        "stats": [
          {
            "name": "공격력",
            "value": 1,
            "probability": 0.07
          },
          {
            "name": "방어력",
            "value": 10,
            "probability": 0.07
          },
          {
            "name": "추가 명중",
            "value": 5,
            "probability": 0.07
          },
          {
            "name": "추가 회피",
            "value": 5,
            "probability": 0.07
          },
          {
            "name": "치명타",
            "value": 5,
            "probability": 0.07
          },
          {
            "name": "치명타 저항",
            "value": 5,
            "probability": 0.07
          },
          {
            "name": "막기",
            "value": 7,
            "probability": 0.07
          },
          {
            "name": "생명력",
            "value": 30,
            "probability": 0.105
          },
          {
            "name": "정신력",
            "value": 15,
            "probability": 0.105
          }
        ]
      },
      "상급": {
        "probability": 0.3,
        "stats": [
          {
            "name": "공격력",
            "value": 3,
            "probability": 0.03
          },
          {
            "name": "방어력",
            "value": 30,
            "probability": 0.03
          },
          {
            "name": "추가 명중",
            "value": 7,
            "probability": 0.03
          },
          {
            "name": "추가 회피",
            "value": 7,
            "probability": 0.03
          },
          {
            "name": "치명타",
            "value": 7,
            "probability": 0.03
          },
          {
            "name": "치명타 저항",
            "value": 7,
            "probability": 0.03
          },
          {
            "name": "막기",
            "value": 10,
            "probability": 0.03
          },
          {
            "name": "생명력",
            "value": 60,
            "probability": 0.045
          },
          {
            "name": "정신력",
            "value": 30,
            "probability": 0.045
          }
        ]
      }
    }
  },
  "중급 마석 (각인)": {
    "grades": {
      "기본": {
        "probability": 0.5,
        "stats": [
          {
            "name": "공격력",
            "value": 2,
            "probability": 0.05
          },
          {
            "name": "방어력",
            "value": 20,
            "probability": 0.05
          },
          {
            "name": "추가 명중",
            "value": 6,
            "probability": 0.05
          },
          {
            "name": "추가 회피",
            "value": 6,
            "probability": 0.05
          },
          {
            "name": "치명타",
            "value": 6,
            "probability": 0.05
          },
          {
            "name": "치명타 저항",
            "value": 6,
            "probability": 0.05
          },
          {
            "name": "막기",
            "value": 9,
            "probability": 0.05
          },
          {
            "name": "생명력",
            "value": 45,
            "probability": 0.075
          },
          {
            "name": "정신력",
            "value": 23,
            "probability": 0.075
          }
        ]
      },
      "상급": {
        "probability": 0.35,
        "stats": [
          {
            "name": "공격력",
            "value": 4,
            "probability": 0.035
          },
          {
            "name": "방어력",
            "value": 40,
            "probability": 0.035
          },
          {
            "name": "추가 명중",
            "value": 9,
            "probability": 0.035
          },
          {
            "name": "추가 회피",
            "value": 9,
            "probability": 0.035
          },
          {
            "name": "치명타",
            "value": 9,
            "probability": 0.035
          },
          {
            "name": "치명타 저항",
            "value": 9,
            "probability": 0.035
          },
          {
            "name": "막기",
            "value": 13,
            "probability": 0.035
          },
          {
            "name": "생명력",
            "value": 80,
            "probability": 0.0525
          },
          {
            "name": "정신력",
            "value": 40,
            "probability": 0.0525
          }
        ]
      },
      "최상급": {
        "probability": 0.15,
        "stats": [
          {
            "name": "공격력",
            "value": 8,
            "probability": 0.015
          },
          {
            "name": "방어력",
            "value": 75,
            "probability": 0.015
          },
          {
            "name": "추가 명중",
            "value": 13,
            "probability": 0.015
          },
          {
            "name": "추가 회피",
            "value": 13,
            "probability": 0.015
          },
          {
            "name": "치명타",
            "value": 13,
            "probability": 0.015
          },
          {
            "name": "치명타 저항",
            "value": 13,
            "probability": 0.015
          },
          {
            "name": "막기",
            "value": 18,
            "probability": 0.015
          },
          {
            "name": "생명력",
            "value": 130,
            "probability": 0.0225
          },
          {
            "name": "정신력",
            "value": 65,
            "probability": 0.0225
          }
        ]
      }
    }
  },
  "상급 마석 (각인)": {
    "grades": {
      "기본": {
        "probability": 0.5,
        "stats": [
          {
            "name": "공격력",
            "value": 3,
            "probability": 0.05
          },
          {
            "name": "방어력",
            "value": 30,
            "probability": 0.05
          },
          {
            "name": "추가 명중",
            "value": 7,
            "probability": 0.05
          },
          {
            "name": "추가 회피",
            "value": 7,
            "probability": 0.05
          },
          {
            "name": "치명타",
            "value": 7,
            "probability": 0.05
          },
          {
            "name": "치명타 저항",
            "value": 7,
            "probability": 0.05
          },
          {
            "name": "막기",
            "value": 10,
            "probability": 0.05
          },
          {
            "name": "생명력",
            "value": 60,
            "probability": 0.07
          },
          {
            "name": "정신력",
            "value": 30,
            "probability": 0.07
          },
          {
            "name": "피해 증폭",
            "value": 10,
            "probability": 0.0025
          },
          {
            "name": "무기 피해 증폭",
            "value": 10,
            "probability": 0.0025
          },
          {
            "name": "치명타 피해 증폭",
            "value": 10,
            "probability": 0.0025
          },
          {
            "name": "후방 피해 증폭",
            "value": 10,
            "probability": 0.0025
          }
        ]
      },
      "상급": {
        "probability": 0.35,
        "stats": [
          {
            "name": "공격력",
            "value": 5,
            "probability": 0.035
          },
          {
            "name": "방어력",
            "value": 50,
            "probability": 0.035
          },
          {
            "name": "추가 명중",
            "value": 10,
            "probability": 0.035
          },
          {
            "name": "추가 회피",
            "value": 10,
            "probability": 0.035
          },
          {
            "name": "치명타",
            "value": 10,
            "probability": 0.035
          },
          {
            "name": "치명타 저항",
            "value": 10,
            "probability": 0.035
          },
          {
            "name": "막기",
            "value": 15,
            "probability": 0.035
          },
          {
            "name": "생명력",
            "value": 100,
            "probability": 0.049
          },
          {
            "name": "정신력",
            "value": 50,
            "probability": 0.049
          },
          {
            "name": "피해 증폭",
            "value": 30,
            "probability": 0.00175
          },
          {
            "name": "무기 피해 증폭",
            "value": 30,
            "probability": 0.00175
          },
          {
            "name": "치명타 피해 증폭",
            "value": 30,
            "probability": 0.00175
          },
          {
            "name": "후방 피해 증폭",
            "value": 30,
            "probability": 0.00175
          }
        ]
      },
      "최상급": {
        "probability": 0.15,
        "stats": [
          {
            "name": "공격력",
            "value": 10,
            "probability": 0.015
          },
          {
            "name": "방어력",
            "value": 100,
            "probability": 0.015
          },
          {
            "name": "추가 명중",
            "value": 15,
            "probability": 0.015
          },
          {
            "name": "추가 회피",
            "value": 15,
            "probability": 0.015
          },
          {
            "name": "치명타",
            "value": 15,
            "probability": 0.015
          },
          {
            "name": "치명타 저항",
            "value": 15,
            "probability": 0.015
          },
          {
            "name": "막기",
            "value": 20,
            "probability": 0.015
          },
          {
            "name": "생명력",
            "value": 160,
            "probability": 0.021
          },
          {
            "name": "정신력",
            "value": 80,
            "probability": 0.021
          },
          {
            "name": "피해 증폭",
            "value": 100,
            "probability": 0.00075
          },
          {
            "name": "무기 피해 증폭",
            "value": 100,
            "probability": 0.00075
          },
          {
            "name": "치명타 피해 증폭",
            "value": 100,
            "probability": 0.00075
          },
          {
            "name": "후방 피해 증폭",
            "value": 100,
            "probability": 0.00075
          }
        ]
      }
    }
  },
  "하급 심연의 영석 (각인)": {
    "grades": {
      "기본": {
        "probability": 0.5,
        "stats": [
          {
            "name": "공격력",
            "value": 1,
            "probability": 0.03
          },
          {
            "name": "방어력",
            "value": 10,
            "probability": 0.03
          },
          {
            "name": "추가 명중",
            "value": 5,
            "probability": 0.03
          },
          {
            "name": "추가 회피",
            "value": 5,
            "probability": 0.03
          },
          {
            "name": "치명타",
            "value": 5,
            "probability": 0.03
          },
          {
            "name": "치명타 저항",
            "value": 5,
            "probability": 0.03
          },
          {
            "name": "막기",
            "value": 7,
            "probability": 0.05
          },
          {
            "name": "생명력",
            "value": 30,
            "probability": 0.06
          },
          {
            "name": "정신력",
            "value": 15,
            "probability": 0.06
          },
          {
            "name": "PVP 공격력",
            "value": 2,
            "probability": 0.025
          },
          {
            "name": "PVP 방어력",
            "value": 20,
            "probability": 0.025
          },
          {
            "name": "PVP 명중",
            "value": 10,
            "probability": 0.025
          },
          {
            "name": "PVP 회피",
            "value": 10,
            "probability": 0.025
          },
          {
            "name": "PVP 치명타",
            "value": 10,
            "probability": 0.025
          },
          {
            "name": "PVP 치명타 저항",
            "value": 10,
            "probability": 0.025
          }
        ]
      },
      "상급": {
        "probability": 0.35,
        "stats": [
          {
            "name": "공격력",
            "value": 3,
            "probability": 0.021
          },
          {
            "name": "방어력",
            "value": 30,
            "probability": 0.021
          },
          {
            "name": "추가 명중",
            "value": 7,
            "probability": 0.021
          },
          {
            "name": "추가 회피",
            "value": 7,
            "probability": 0.021
          },
          {
            "name": "치명타",
            "value": 7,
            "probability": 0.021
          },
          {
            "name": "치명타 저항",
            "value": 7,
            "probability": 0.021
          },
          {
            "name": "막기",
            "value": 10,
            "probability": 0.035
          },
          {
            "name": "생명력",
            "value": 60,
            "probability": 0.042
          },
          {
            "name": "정신력",
            "value": 30,
            "probability": 0.042
          },
          {
            "name": "PVP 공격력",
            "value": 6,
            "probability": 0.0175
          },
          {
            "name": "PVP 방어력",
            "value": 60,
            "probability": 0.0175
          },
          {
            "name": "PVP 명중",
            "value": 14,
            "probability": 0.0175
          },
          {
            "name": "PVP 회피",
            "value": 14,
            "probability": 0.0175
          },
          {
            "name": "PVP 치명타",
            "value": 14,
            "probability": 0.0175
          },
          {
            "name": "PVP 치명타 저항",
            "value": 14,
            "probability": 0.0175
          }
        ]
      },
      "최상급": {
        "probability": 0.15,
        "stats": [
          {
            "name": "공격력",
            "value": 5,
            "probability": 0.009
          },
          {
            "name": "방어력",
            "value": 50,
            "probability": 0.009
          },
          {
            "name": "추가 명중",
            "value": 10,
            "probability": 0.009
          },
          {
            "name": "추가 회피",
            "value": 10,
            "probability": 0.009
          },
          {
            "name": "치명타",
            "value": 10,
            "probability": 0.009
          },
          {
            "name": "치명타 저항",
            "value": 10,
            "probability": 0.009
          },
          {
            "name": "막기",
            "value": 15,
            "probability": 0.015
          },
          {
            "name": "생명력",
            "value": 100,
            "probability": 0.018
          },
          {
            "name": "정신력",
            "value": 50,
            "probability": 0.018
          },
          {
            "name": "PVP 공격력",
            "value": 10,
            "probability": 0.0075
          },
          {
            "name": "PVP 방어력",
            "value": 100,
            "probability": 0.0075
          },
          {
            "name": "PVP 명중",
            "value": 20,
            "probability": 0.0075
          },
          {
            "name": "PVP 회피",
            "value": 20,
            "probability": 0.0075
          },
          {
            "name": "PVP 치명타",
            "value": 20,
            "probability": 0.0075
          },
          {
            "name": "PVP 치명타 저항",
            "value": 20,
            "probability": 0.0075
          }
        ]
      }
    }
  },
  "중급 심연의 영석 (각인)": {
    "grades": {
      "기본": {
        "probability": 0.5,
        "stats": [
          {
            "name": "공격력",
            "value": 2,
            "probability": 0.03
          },
          {
            "name": "방어력",
            "value": 20,
            "probability": 0.03
          },
          {
            "name": "추가 명중",
            "value": 6,
            "probability": 0.03
          },
          {
            "name": "추가 회피",
            "value": 6,
            "probability": 0.03
          },
          {
            "name": "치명타",
            "value": 6,
            "probability": 0.03
          },
          {
            "name": "치명타 저항",
            "value": 6,
            "probability": 0.03
          },
          {
            "name": "막기",
            "value": 9,
            "probability": 0.05
          },
          {
            "name": "생명력",
            "value": 45,
            "probability": 0.06
          },
          {
            "name": "정신력",
            "value": 23,
            "probability": 0.06
          },
          {
            "name": "PVP 공격력",
            "value": 4,
            "probability": 0.025
          },
          {
            "name": "PVP 방어력",
            "value": 40,
            "probability": 0.025
          },
          {
            "name": "PVP 명중",
            "value": 12,
            "probability": 0.025
          },
          {
            "name": "PVP 회피",
            "value": 12,
            "probability": 0.025
          },
          {
            "name": "PVP 치명타",
            "value": 12,
            "probability": 0.025
          },
          {
            "name": "PVP 치명타 저항",
            "value": 12,
            "probability": 0.025
          }
        ]
      },
      "상급": {
        "probability": 0.35,
        "stats": [
          {
            "name": "공격력",
            "value": 4,
            "probability": 0.021
          },
          {
            "name": "방어력",
            "value": 40,
            "probability": 0.021
          },
          {
            "name": "추가 명중",
            "value": 9,
            "probability": 0.021
          },
          {
            "name": "추가 회피",
            "value": 9,
            "probability": 0.021
          },
          {
            "name": "치명타",
            "value": 9,
            "probability": 0.021
          },
          {
            "name": "치명타 저항",
            "value": 9,
            "probability": 0.021
          },
          {
            "name": "막기",
            "value": 13,
            "probability": 0.035
          },
          {
            "name": "생명력",
            "value": 80,
            "probability": 0.042
          },
          {
            "name": "정신력",
            "value": 40,
            "probability": 0.042
          },
          {
            "name": "PVP 공격력",
            "value": 8,
            "probability": 0.0175
          },
          {
            "name": "PVP 방어력",
            "value": 80,
            "probability": 0.0175
          },
          {
            "name": "PVP 명중",
            "value": 18,
            "probability": 0.0175
          },
          {
            "name": "PVP 회피",
            "value": 18,
            "probability": 0.0175
          },
          {
            "name": "PVP 치명타",
            "value": 18,
            "probability": 0.0175
          },
          {
            "name": "PVP 치명타 저항",
            "value": 18,
            "probability": 0.0175
          }
        ]
      },
      "최상급": {
        "probability": 0.15,
        "stats": [
          {
            "name": "공격력",
            "value": 8,
            "probability": 0.009
          },
          {
            "name": "방어력",
            "value": 75,
            "probability": 0.009
          },
          {
            "name": "추가 명중",
            "value": 13,
            "probability": 0.009
          },
          {
            "name": "추가 회피",
            "value": 13,
            "probability": 0.009
          },
          {
            "name": "치명타",
            "value": 13,
            "probability": 0.009
          },
          {
            "name": "치명타 저항",
            "value": 13,
            "probability": 0.009
          },
          {
            "name": "막기",
            "value": 18,
            "probability": 0.015
          },
          {
            "name": "생명력",
            "value": 130,
            "probability": 0.018
          },
          {
            "name": "정신력",
            "value": 65,
            "probability": 0.018
          },
          {
            "name": "PVP 공격력",
            "value": 16,
            "probability": 0.0075
          },
          {
            "name": "PVP 방어력",
            "value": 150,
            "probability": 0.0075
          },
          {
            "name": "PVP 명중",
            "value": 26,
            "probability": 0.0075
          },
          {
            "name": "PVP 회피",
            "value": 26,
            "probability": 0.0075
          },
          {
            "name": "PVP 치명타",
            "value": 26,
            "probability": 0.0075
          },
          {
            "name": "PVP 치명타 저항",
            "value": 26,
            "probability": 0.0075
          }
        ]
      }
    }
  },
  "상급 심연의 영석 (각인)": {
    "grades": {
      "기본": {
        "probability": 0.5,
        "stats": [
          {
            "name": "공격력",
            "value": 3,
            "probability": 0.03
          },
          {
            "name": "방어력",
            "value": 30,
            "probability": 0.03
          },
          {
            "name": "추가 명중",
            "value": 7,
            "probability": 0.03
          },
          {
            "name": "추가 회피",
            "value": 7,
            "probability": 0.03
          },
          {
            "name": "치명타",
            "value": 7,
            "probability": 0.03
          },
          {
            "name": "치명타 저항",
            "value": 7,
            "probability": 0.03
          },
          {
            "name": "막기",
            "value": 10,
            "probability": 0.05
          },
          {
            "name": "생명력",
            "value": 60,
            "probability": 0.06
          },
          {
            "name": "정신력",
            "value": 30,
            "probability": 0.06
          },
          {
            "name": "피해 증폭",
            "value": 10,
            "probability": 0.0025
          },
          {
            "name": "무기 피해 증폭",
            "value": 10,
            "probability": 0.0025
          },
          {
            "name": "치명타 피해 증폭",
            "value": 10,
            "probability": 0.0025
          },
          {
            "name": "후방 피해 증폭",
            "value": 10,
            "probability": 0.0025
          },
          {
            "name": "PVP 공격력",
            "value": 6,
            "probability": 0.0225
          },
          {
            "name": "PVP 방어력",
            "value": 60,
            "probability": 0.0225
          },
          {
            "name": "PVP 명중",
            "value": 14,
            "probability": 0.0225
          },
          {
            "name": "PVP 회피",
            "value": 14,
            "probability": 0.0225
          },
          {
            "name": "PVP 치명타",
            "value": 14,
            "probability": 0.0225
          },
          {
            "name": "PVP 치명타 저항",
            "value": 14,
            "probability": 0.0225
          },
          {
            "name": "PVP 피해 증폭",
            "value": 20,
            "probability": 0.005
          }
        ]
      },
      "상급": {
        "probability": 0.35,
        "stats": [
          {
            "name": "공격력",
            "value": 5,
            "probability": 0.021
          },
          {
            "name": "방어력",
            "value": 50,
            "probability": 0.021
          },
          {
            "name": "추가 명중",
            "value": 10,
            "probability": 0.021
          },
          {
            "name": "추가 회피",
            "value": 10,
            "probability": 0.021
          },
          {
            "name": "치명타",
            "value": 10,
            "probability": 0.021
          },
          {
            "name": "치명타 저항",
            "value": 10,
            "probability": 0.021
          },
          {
            "name": "막기",
            "value": 15,
            "probability": 0.035
          },
          {
            "name": "생명력",
            "value": 100,
            "probability": 0.042
          },
          {
            "name": "정신력",
            "value": 50,
            "probability": 0.042
          },
          {
            "name": "피해 증폭",
            "value": 30,
            "probability": 0.00175
          },
          {
            "name": "무기 피해 증폭",
            "value": 30,
            "probability": 0.00175
          },
          {
            "name": "치명타 피해 증폭",
            "value": 30,
            "probability": 0.00175
          },
          {
            "name": "후방 피해 증폭",
            "value": 30,
            "probability": 0.00175
          },
          {
            "name": "PVP 공격력",
            "value": 10,
            "probability": 0.01575
          },
          {
            "name": "PVP 방어력",
            "value": 100,
            "probability": 0.01575
          },
          {
            "name": "PVP 명중",
            "value": 20,
            "probability": 0.01575
          },
          {
            "name": "PVP 회피",
            "value": 20,
            "probability": 0.01575
          },
          {
            "name": "PVP 치명타",
            "value": 20,
            "probability": 0.01575
          },
          {
            "name": "PVP 치명타 저항",
            "value": 20,
            "probability": 0.01575
          },
          {
            "name": "PVP 피해 증폭",
            "value": 60,
            "probability": 0.0035
          }
        ]
      },
      "최상급": {
        "probability": 0.15,
        "stats": [
          {
            "name": "공격력",
            "value": 10,
            "probability": 0.009
          },
          {
            "name": "방어력",
            "value": 100,
            "probability": 0.009
          },
          {
            "name": "추가 명중",
            "value": 15,
            "probability": 0.009
          },
          {
            "name": "추가 회피",
            "value": 15,
            "probability": 0.009
          },
          {
            "name": "치명타",
            "value": 15,
            "probability": 0.009
          },
          {
            "name": "치명타 저항",
            "value": 15,
            "probability": 0.009
          },
          {
            "name": "막기",
            "value": 20,
            "probability": 0.015
          },
          {
            "name": "생명력",
            "value": 160,
            "probability": 0.018
          },
          {
            "name": "정신력",
            "value": 80,
            "probability": 0.018
          },
          {
            "name": "피해 증폭",
            "value": 100,
            "probability": 0.00075
          },
          {
            "name": "무기 피해 증폭",
            "value": 100,
            "probability": 0.00075
          },
          {
            "name": "치명타 피해 증폭",
            "value": 100,
            "probability": 0.00075
          },
          {
            "name": "후방 피해 증폭",
            "value": 100,
            "probability": 0.00075
          },
          {
            "name": "PVP 공격력",
            "value": 20,
            "probability": 0.00675
          },
          {
            "name": "PVP 방어력",
            "value": 200,
            "probability": 0.00675
          },
          {
            "name": "PVP 명중",
            "value": 30,
            "probability": 0.00675
          },
          {
            "name": "PVP 회피",
            "value": 30,
            "probability": 0.00675
          },
          {
            "name": "PVP 치명타",
            "value": 30,
            "probability": 0.00675
          },
          {
            "name": "PVP 치명타 저항",
            "value": 30,
            "probability": 0.00675
          },
          {
            "name": "PVP 피해 증폭",
            "value": 200,
            "probability": 0.0015
          }
        ]
      }
    }
  },
  "하급 영석 (각인)": {
    "grades": {
      "기본": {
        "probability": 0.7,
        "stats": [
          {
            "name": "공격력",
            "value": 1,
            "probability": 0.07
          },
          {
            "name": "방어력",
            "value": 10,
            "probability": 0.07
          },
          {
            "name": "추가 명중",
            "value": 5,
            "probability": 0.07
          },
          {
            "name": "추가 회피",
            "value": 5,
            "probability": 0.07
          },
          {
            "name": "치명타",
            "value": 5,
            "probability": 0.07
          },
          {
            "name": "치명타 저항",
            "value": 5,
            "probability": 0.07
          },
          {
            "name": "막기",
            "value": 7,
            "probability": 0.07
          },
          {
            "name": "생명력",
            "value": 30,
            "probability": 0.105
          },
          {
            "name": "정신력",
            "value": 15,
            "probability": 0.105
          }
        ]
      },
      "상급": {
        "probability": 0.3,
        "stats": [
          {
            "name": "공격력",
            "value": 3,
            "probability": 0.03
          },
          {
            "name": "방어력",
            "value": 30,
            "probability": 0.03
          },
          {
            "name": "추가 명중",
            "value": 7,
            "probability": 0.03
          },
          {
            "name": "추가 회피",
            "value": 7,
            "probability": 0.03
          },
          {
            "name": "치명타",
            "value": 7,
            "probability": 0.03
          },
          {
            "name": "치명타 저항",
            "value": 7,
            "probability": 0.03
          },
          {
            "name": "막기",
            "value": 10,
            "probability": 0.03
          },
          {
            "name": "생명력",
            "value": 60,
            "probability": 0.045
          },
          {
            "name": "정신력",
            "value": 30,
            "probability": 0.045
          }
        ]
      }
    }
  },
  "중급 영석 (각인)": {
    "grades": {
      "기본": {
        "probability": 0.5,
        "stats": [
          {
            "name": "공격력",
            "value": 2,
            "probability": 0.05
          },
          {
            "name": "방어력",
            "value": 20,
            "probability": 0.05
          },
          {
            "name": "추가 명중",
            "value": 6,
            "probability": 0.05
          },
          {
            "name": "추가 회피",
            "value": 6,
            "probability": 0.05
          },
          {
            "name": "치명타",
            "value": 6,
            "probability": 0.05
          },
          {
            "name": "치명타 저항",
            "value": 6,
            "probability": 0.05
          },
          {
            "name": "막기",
            "value": 9,
            "probability": 0.05
          },
          {
            "name": "생명력",
            "value": 45,
            "probability": 0.075
          },
          {
            "name": "정신력",
            "value": 23,
            "probability": 0.075
          }
        ]
      },
      "상급": {
        "probability": 0.35,
        "stats": [
          {
            "name": "공격력",
            "value": 4,
            "probability": 0.035
          },
          {
            "name": "방어력",
            "value": 40,
            "probability": 0.035
          },
          {
            "name": "추가 명중",
            "value": 9,
            "probability": 0.035
          },
          {
            "name": "추가 회피",
            "value": 9,
            "probability": 0.035
          },
          {
            "name": "치명타",
            "value": 9,
            "probability": 0.035
          },
          {
            "name": "치명타 저항",
            "value": 9,
            "probability": 0.035
          },
          {
            "name": "막기",
            "value": 13,
            "probability": 0.035
          },
          {
            "name": "생명력",
            "value": 80,
            "probability": 0.0525
          },
          {
            "name": "정신력",
            "value": 40,
            "probability": 0.0525
          }
        ]
      },
      "최상급": {
        "probability": 0.15,
        "stats": [
          {
            "name": "공격력",
            "value": 8,
            "probability": 0.015
          },
          {
            "name": "방어력",
            "value": 75,
            "probability": 0.015
          },
          {
            "name": "추가 명중",
            "value": 13,
            "probability": 0.015
          },
          {
            "name": "추가 회피",
            "value": 13,
            "probability": 0.015
          },
          {
            "name": "치명타",
            "value": 13,
            "probability": 0.015
          },
          {
            "name": "치명타 저항",
            "value": 13,
            "probability": 0.015
          },
          {
            "name": "막기",
            "value": 18,
            "probability": 0.015
          },
          {
            "name": "생명력",
            "value": 130,
            "probability": 0.0225
          },
          {
            "name": "정신력",
            "value": 65,
            "probability": 0.0225
          }
        ]
      }
    }
  },
  "상급 영석 (각인)": {
    "grades": {
      "기본": {
        "probability": 0.5,
        "stats": [
          {
            "name": "공격력",
            "value": 3,
            "probability": 0.05
          },
          {
            "name": "방어력",
            "value": 30,
            "probability": 0.05
          },
          {
            "name": "추가 명중",
            "value": 7,
            "probability": 0.05
          },
          {
            "name": "추가 회피",
            "value": 7,
            "probability": 0.05
          },
          {
            "name": "치명타",
            "value": 7,
            "probability": 0.05
          },
          {
            "name": "치명타 저항",
            "value": 7,
            "probability": 0.05
          },
          {
            "name": "막기",
            "value": 10,
            "probability": 0.05
          },
          {
            "name": "생명력",
            "value": 60,
            "probability": 0.07
          },
          {
            "name": "정신력",
            "value": 30,
            "probability": 0.07
          },
          {
            "name": "피해 증폭",
            "value": 10,
            "probability": 0.0025
          },
          {
            "name": "무기 피해 증폭",
            "value": 10,
            "probability": 0.0025
          },
          {
            "name": "치명타 피해 증폭",
            "value": 10,
            "probability": 0.0025
          },
          {
            "name": "후방 피해 증폭",
            "value": 10,
            "probability": 0.0025
          }
        ]
      },
      "상급": {
        "probability": 0.35,
        "stats": [
          {
            "name": "공격력",
            "value": 5,
            "probability": 0.035
          },
          {
            "name": "방어력",
            "value": 50,
            "probability": 0.035
          },
          {
            "name": "추가 명중",
            "value": 10,
            "probability": 0.035
          },
          {
            "name": "추가 회피",
            "value": 10,
            "probability": 0.035
          },
          {
            "name": "치명타",
            "value": 10,
            "probability": 0.035
          },
          {
            "name": "치명타 저항",
            "value": 10,
            "probability": 0.035
          },
          {
            "name": "막기",
            "value": 15,
            "probability": 0.035
          },
          {
            "name": "생명력",
            "value": 100,
            "probability": 0.049
          },
          {
            "name": "정신력",
            "value": 50,
            "probability": 0.049
          },
          {
            "name": "피해 증폭",
            "value": 30,
            "probability": 0.00175
          },
          {
            "name": "무기 피해 증폭",
            "value": 30,
            "probability": 0.00175
          },
          {
            "name": "치명타 피해 증폭",
            "value": 30,
            "probability": 0.00175
          },
          {
            "name": "후방 피해 증폭",
            "value": 30,
            "probability": 0.00175
          }
        ]
      },
      "최상급": {
        "probability": 0.15,
        "stats": [
          {
            "name": "공격력",
            "value": 10,
            "probability": 0.015
          },
          {
            "name": "방어력",
            "value": 100,
            "probability": 0.015
          },
          {
            "name": "추가 명중",
            "value": 15,
            "probability": 0.015
          },
          {
            "name": "추가 회피",
            "value": 15,
            "probability": 0.015
          },
          {
            "name": "치명타",
            "value": 15,
            "probability": 0.015
          },
          {
            "name": "치명타 저항",
            "value": 15,
            "probability": 0.015
          },
          {
            "name": "막기",
            "value": 20,
            "probability": 0.015
          },
          {
            "name": "생명력",
            "value": 160,
            "probability": 0.021
          },
          {
            "name": "정신력",
            "value": 80,
            "probability": 0.021
          },
          {
            "name": "피해 증폭",
            "value": 100,
            "probability": 0.00075
          },
          {
            "name": "무기 피해 증폭",
            "value": 100,
            "probability": 0.00075
          },
          {
            "name": "치명타 피해 증폭",
            "value": 100,
            "probability": 0.00075
          },
          {
            "name": "후방 피해 증폭",
            "value": 100,
            "probability": 0.00075
          }
        ]
      }
    }
  },
  "하급 심연의 마석 (이벤트)": {
    "grades": {
      "기본": {
        "probability": 0.5,
        "stats": [
          {
            "name": "공격력",
            "value": 1,
            "probability": 0.03
          },
          {
            "name": "방어력",
            "value": 10,
            "probability": 0.03
          },
          {
            "name": "추가 명중",
            "value": 5,
            "probability": 0.03
          },
          {
            "name": "추가 회피",
            "value": 5,
            "probability": 0.03
          },
          {
            "name": "치명타",
            "value": 5,
            "probability": 0.03
          },
          {
            "name": "치명타 저항",
            "value": 5,
            "probability": 0.03
          },
          {
            "name": "막기",
            "value": 7,
            "probability": 0.05
          },
          {
            "name": "생명력",
            "value": 30,
            "probability": 0.06
          },
          {
            "name": "정신력",
            "value": 15,
            "probability": 0.06
          },
          {
            "name": "PVP 공격력",
            "value": 2,
            "probability": 0.025
          },
          {
            "name": "PVP 방어력",
            "value": 20,
            "probability": 0.025
          },
          {
            "name": "PVP 명중",
            "value": 10,
            "probability": 0.025
          },
          {
            "name": "PVP 회피",
            "value": 10,
            "probability": 0.025
          },
          {
            "name": "PVP 치명타",
            "value": 10,
            "probability": 0.025
          },
          {
            "name": "PVP 치명타 저항",
            "value": 10,
            "probability": 0.025
          }
        ]
      },
      "상급": {
        "probability": 0.35,
        "stats": [
          {
            "name": "공격력",
            "value": 3,
            "probability": 0.021
          },
          {
            "name": "방어력",
            "value": 30,
            "probability": 0.021
          },
          {
            "name": "추가 명중",
            "value": 7,
            "probability": 0.021
          },
          {
            "name": "추가 회피",
            "value": 7,
            "probability": 0.021
          },
          {
            "name": "치명타",
            "value": 7,
            "probability": 0.021
          },
          {
            "name": "치명타 저항",
            "value": 7,
            "probability": 0.021
          },
          {
            "name": "막기",
            "value": 10,
            "probability": 0.035
          },
          {
            "name": "생명력",
            "value": 60,
            "probability": 0.042
          },
          {
            "name": "정신력",
            "value": 30,
            "probability": 0.042
          },
          {
            "name": "PVP 공격력",
            "value": 6,
            "probability": 0.0175
          },
          {
            "name": "PVP 방어력",
            "value": 60,
            "probability": 0.0175
          },
          {
            "name": "PVP 명중",
            "value": 14,
            "probability": 0.0175
          },
          {
            "name": "PVP 회피",
            "value": 14,
            "probability": 0.0175
          },
          {
            "name": "PVP 치명타",
            "value": 14,
            "probability": 0.0175
          },
          {
            "name": "PVP 치명타 저항",
            "value": 14,
            "probability": 0.0175
          }
        ]
      },
      "최상급": {
        "probability": 0.15,
        "stats": [
          {
            "name": "공격력",
            "value": 5,
            "probability": 0.009
          },
          {
            "name": "방어력",
            "value": 50,
            "probability": 0.009
          },
          {
            "name": "추가 명중",
            "value": 10,
            "probability": 0.009
          },
          {
            "name": "추가 회피",
            "value": 10,
            "probability": 0.009
          },
          {
            "name": "치명타",
            "value": 10,
            "probability": 0.009
          },
          {
            "name": "치명타 저항",
            "value": 10,
            "probability": 0.009
          },
          {
            "name": "막기",
            "value": 15,
            "probability": 0.015
          },
          {
            "name": "생명력",
            "value": 100,
            "probability": 0.018
          },
          {
            "name": "정신력",
            "value": 50,
            "probability": 0.018
          },
          {
            "name": "PVP 공격력",
            "value": 10,
            "probability": 0.0075
          },
          {
            "name": "PVP 방어력",
            "value": 100,
            "probability": 0.0075
          },
          {
            "name": "PVP 명중",
            "value": 20,
            "probability": 0.0075
          },
          {
            "name": "PVP 회피",
            "value": 20,
            "probability": 0.0075
          },
          {
            "name": "PVP 치명타",
            "value": 20,
            "probability": 0.0075
          },
          {
            "name": "PVP 치명타 저항",
            "value": 20,
            "probability": 0.0075
          }
        ]
      }
    }
  },
  "중급 심연의 마석 (이벤트)": {
    "grades": {
      "기본": {
        "probability": 0.5,
        "stats": [
          {
            "name": "공격력",
            "value": 2,
            "probability": 0.03
          },
          {
            "name": "방어력",
            "value": 20,
            "probability": 0.03
          },
          {
            "name": "추가 명중",
            "value": 6,
            "probability": 0.03
          },
          {
            "name": "추가 회피",
            "value": 6,
            "probability": 0.03
          },
          {
            "name": "치명타",
            "value": 6,
            "probability": 0.03
          },
          {
            "name": "치명타 저항",
            "value": 6,
            "probability": 0.03
          },
          {
            "name": "막기",
            "value": 9,
            "probability": 0.05
          },
          {
            "name": "생명력",
            "value": 45,
            "probability": 0.06
          },
          {
            "name": "정신력",
            "value": 23,
            "probability": 0.06
          },
          {
            "name": "PVP 공격력",
            "value": 4,
            "probability": 0.025
          },
          {
            "name": "PVP 방어력",
            "value": 40,
            "probability": 0.025
          },
          {
            "name": "PVP 명중",
            "value": 12,
            "probability": 0.025
          },
          {
            "name": "PVP 회피",
            "value": 12,
            "probability": 0.025
          },
          {
            "name": "PVP 치명타",
            "value": 12,
            "probability": 0.025
          },
          {
            "name": "PVP 치명타 저항",
            "value": 12,
            "probability": 0.025
          }
        ]
      },
      "상급": {
        "probability": 0.35,
        "stats": [
          {
            "name": "공격력",
            "value": 4,
            "probability": 0.021
          },
          {
            "name": "방어력",
            "value": 40,
            "probability": 0.021
          },
          {
            "name": "추가 명중",
            "value": 9,
            "probability": 0.021
          },
          {
            "name": "추가 회피",
            "value": 9,
            "probability": 0.021
          },
          {
            "name": "치명타",
            "value": 9,
            "probability": 0.021
          },
          {
            "name": "치명타 저항",
            "value": 9,
            "probability": 0.021
          },
          {
            "name": "막기",
            "value": 13,
            "probability": 0.035
          },
          {
            "name": "생명력",
            "value": 80,
            "probability": 0.042
          },
          {
            "name": "정신력",
            "value": 40,
            "probability": 0.042
          },
          {
            "name": "PVP 공격력",
            "value": 8,
            "probability": 0.0175
          },
          {
            "name": "PVP 방어력",
            "value": 80,
            "probability": 0.0175
          },
          {
            "name": "PVP 명중",
            "value": 18,
            "probability": 0.0175
          },
          {
            "name": "PVP 회피",
            "value": 18,
            "probability": 0.0175
          },
          {
            "name": "PVP 치명타",
            "value": 18,
            "probability": 0.0175
          },
          {
            "name": "PVP 치명타 저항",
            "value": 18,
            "probability": 0.0175
          }
        ]
      },
      "최상급": {
        "probability": 0.15,
        "stats": [
          {
            "name": "공격력",
            "value": 8,
            "probability": 0.009
          },
          {
            "name": "방어력",
            "value": 75,
            "probability": 0.009
          },
          {
            "name": "추가 명중",
            "value": 13,
            "probability": 0.009
          },
          {
            "name": "추가 회피",
            "value": 13,
            "probability": 0.009
          },
          {
            "name": "치명타",
            "value": 13,
            "probability": 0.009
          },
          {
            "name": "치명타 저항",
            "value": 13,
            "probability": 0.009
          },
          {
            "name": "막기",
            "value": 18,
            "probability": 0.015
          },
          {
            "name": "생명력",
            "value": 130,
            "probability": 0.018
          },
          {
            "name": "정신력",
            "value": 65,
            "probability": 0.018
          },
          {
            "name": "PVP 공격력",
            "value": 16,
            "probability": 0.0075
          },
          {
            "name": "PVP 방어력",
            "value": 150,
            "probability": 0.0075
          },
          {
            "name": "PVP 명중",
            "value": 26,
            "probability": 0.0075
          },
          {
            "name": "PVP 회피",
            "value": 26,
            "probability": 0.0075
          },
          {
            "name": "PVP 치명타",
            "value": 26,
            "probability": 0.0075
          },
          {
            "name": "PVP 치명타 저항",
            "value": 26,
            "probability": 0.0075
          }
        ]
      }
    }
  },
  "상급 심연의 마석 (이벤트)": {
    "grades": {
      "기본": {
        "probability": 0.5,
        "stats": [
          {
            "name": "공격력",
            "value": 3,
            "probability": 0.03
          },
          {
            "name": "방어력",
            "value": 30,
            "probability": 0.03
          },
          {
            "name": "추가 명중",
            "value": 7,
            "probability": 0.03
          },
          {
            "name": "추가 회피",
            "value": 7,
            "probability": 0.03
          },
          {
            "name": "치명타",
            "value": 7,
            "probability": 0.03
          },
          {
            "name": "치명타 저항",
            "value": 7,
            "probability": 0.03
          },
          {
            "name": "막기",
            "value": 10,
            "probability": 0.05
          },
          {
            "name": "생명력",
            "value": 60,
            "probability": 0.06
          },
          {
            "name": "정신력",
            "value": 30,
            "probability": 0.06
          },
          {
            "name": "피해 증폭",
            "value": 10,
            "probability": 0.0025
          },
          {
            "name": "무기 피해 증폭",
            "value": 10,
            "probability": 0.0025
          },
          {
            "name": "치명타 피해 증폭",
            "value": 10,
            "probability": 0.0025
          },
          {
            "name": "후방 피해 증폭",
            "value": 10,
            "probability": 0.0025
          },
          {
            "name": "PVP 공격력",
            "value": 6,
            "probability": 0.0225
          },
          {
            "name": "PVP 방어력",
            "value": 60,
            "probability": 0.0225
          },
          {
            "name": "PVP 명중",
            "value": 14,
            "probability": 0.0225
          },
          {
            "name": "PVP 회피",
            "value": 14,
            "probability": 0.0225
          },
          {
            "name": "PVP 치명타",
            "value": 14,
            "probability": 0.0225
          },
          {
            "name": "PVP 치명타 저항",
            "value": 14,
            "probability": 0.0225
          },
          {
            "name": "PVP 피해 증폭",
            "value": 20,
            "probability": 0.005
          }
        ]
      },
      "상급": {
        "probability": 0.35,
        "stats": [
          {
            "name": "공격력",
            "value": 5,
            "probability": 0.021
          },
          {
            "name": "방어력",
            "value": 50,
            "probability": 0.021
          },
          {
            "name": "추가 명중",
            "value": 10,
            "probability": 0.021
          },
          {
            "name": "추가 회피",
            "value": 10,
            "probability": 0.021
          },
          {
            "name": "치명타",
            "value": 10,
            "probability": 0.021
          },
          {
            "name": "치명타 저항",
            "value": 10,
            "probability": 0.021
          },
          {
            "name": "막기",
            "value": 15,
            "probability": 0.035
          },
          {
            "name": "생명력",
            "value": 100,
            "probability": 0.042
          },
          {
            "name": "정신력",
            "value": 50,
            "probability": 0.042
          },
          {
            "name": "피해 증폭",
            "value": 30,
            "probability": 0.00175
          },
          {
            "name": "무기 피해 증폭",
            "value": 30,
            "probability": 0.00175
          },
          {
            "name": "치명타 피해 증폭",
            "value": 30,
            "probability": 0.00175
          },
          {
            "name": "후방 피해 증폭",
            "value": 30,
            "probability": 0.00175
          },
          {
            "name": "PVP 공격력",
            "value": 10,
            "probability": 0.01575
          },
          {
            "name": "PVP 방어력",
            "value": 100,
            "probability": 0.01575
          },
          {
            "name": "PVP 명중",
            "value": 20,
            "probability": 0.01575
          },
          {
            "name": "PVP 회피",
            "value": 20,
            "probability": 0.01575
          },
          {
            "name": "PVP 치명타",
            "value": 20,
            "probability": 0.01575
          },
          {
            "name": "PVP 치명타 저항",
            "value": 20,
            "probability": 0.01575
          },
          {
            "name": "PVP 피해 증폭",
            "value": 60,
            "probability": 0.0035
          }
        ]
      },
      "최상급": {
        "probability": 0.15,
        "stats": [
          {
            "name": "공격력",
            "value": 10,
            "probability": 0.009
          },
          {
            "name": "방어력",
            "value": 100,
            "probability": 0.009
          },
          {
            "name": "추가 명중",
            "value": 15,
            "probability": 0.009
          },
          {
            "name": "추가 회피",
            "value": 15,
            "probability": 0.009
          },
          {
            "name": "치명타",
            "value": 15,
            "probability": 0.009
          },
          {
            "name": "치명타 저항",
            "value": 15,
            "probability": 0.009
          },
          {
            "name": "막기",
            "value": 20,
            "probability": 0.015
          },
          {
            "name": "생명력",
            "value": 160,
            "probability": 0.018
          },
          {
            "name": "정신력",
            "value": 80,
            "probability": 0.018
          },
          {
            "name": "피해 증폭",
            "value": 100,
            "probability": 0.00075
          },
          {
            "name": "무기 피해 증폭",
            "value": 100,
            "probability": 0.00075
          },
          {
            "name": "치명타 피해 증폭",
            "value": 100,
            "probability": 0.00075
          },
          {
            "name": "후방 피해 증폭",
            "value": 100,
            "probability": 0.00075
          },
          {
            "name": "PVP 공격력",
            "value": 20,
            "probability": 0.00675
          },
          {
            "name": "PVP 방어력",
            "value": 200,
            "probability": 0.00675
          },
          {
            "name": "PVP 명중",
            "value": 30,
            "probability": 0.00675
          },
          {
            "name": "PVP 회피",
            "value": 30,
            "probability": 0.00675
          },
          {
            "name": "PVP 치명타",
            "value": 30,
            "probability": 0.00675
          },
          {
            "name": "PVP 치명타 저항",
            "value": 30,
            "probability": 0.00675
          },
          {
            "name": "PVP 피해 증폭",
            "value": 200,
            "probability": 0.0015
          }
        ]
      }
    }
  },
  "하급 마석 (이벤트)": {
    "grades": {
      "기본": {
        "probability": 0.7,
        "stats": [
          {
            "name": "공격력",
            "value": 1,
            "probability": 0.07
          },
          {
            "name": "방어력",
            "value": 10,
            "probability": 0.07
          },
          {
            "name": "추가 명중",
            "value": 5,
            "probability": 0.07
          },
          {
            "name": "추가 회피",
            "value": 5,
            "probability": 0.07
          },
          {
            "name": "치명타",
            "value": 5,
            "probability": 0.07
          },
          {
            "name": "치명타 저항",
            "value": 5,
            "probability": 0.07
          },
          {
            "name": "막기",
            "value": 7,
            "probability": 0.07
          },
          {
            "name": "생명력",
            "value": 30,
            "probability": 0.105
          },
          {
            "name": "정신력",
            "value": 15,
            "probability": 0.105
          }
        ]
      },
      "상급": {
        "probability": 0.3,
        "stats": [
          {
            "name": "공격력",
            "value": 3,
            "probability": 0.03
          },
          {
            "name": "방어력",
            "value": 30,
            "probability": 0.03
          },
          {
            "name": "추가 명중",
            "value": 7,
            "probability": 0.03
          },
          {
            "name": "추가 회피",
            "value": 7,
            "probability": 0.03
          },
          {
            "name": "치명타",
            "value": 7,
            "probability": 0.03
          },
          {
            "name": "치명타 저항",
            "value": 7,
            "probability": 0.03
          },
          {
            "name": "막기",
            "value": 10,
            "probability": 0.03
          },
          {
            "name": "생명력",
            "value": 60,
            "probability": 0.045
          },
          {
            "name": "정신력",
            "value": 30,
            "probability": 0.045
          }
        ]
      }
    }
  },
  "중급 마석 (이벤트)": {
    "grades": {
      "기본": {
        "probability": 0.5,
        "stats": [
          {
            "name": "공격력",
            "value": 2,
            "probability": 0.05
          },
          {
            "name": "방어력",
            "value": 20,
            "probability": 0.05
          },
          {
            "name": "추가 명중",
            "value": 6,
            "probability": 0.05
          },
          {
            "name": "추가 회피",
            "value": 6,
            "probability": 0.05
          },
          {
            "name": "치명타",
            "value": 6,
            "probability": 0.05
          },
          {
            "name": "치명타 저항",
            "value": 6,
            "probability": 0.05
          },
          {
            "name": "막기",
            "value": 9,
            "probability": 0.05
          },
          {
            "name": "생명력",
            "value": 45,
            "probability": 0.075
          },
          {
            "name": "정신력",
            "value": 23,
            "probability": 0.075
          }
        ]
      },
      "상급": {
        "probability": 0.35,
        "stats": [
          {
            "name": "공격력",
            "value": 4,
            "probability": 0.035
          },
          {
            "name": "방어력",
            "value": 40,
            "probability": 0.035
          },
          {
            "name": "추가 명중",
            "value": 9,
            "probability": 0.035
          },
          {
            "name": "추가 회피",
            "value": 9,
            "probability": 0.035
          },
          {
            "name": "치명타",
            "value": 9,
            "probability": 0.035
          },
          {
            "name": "치명타 저항",
            "value": 9,
            "probability": 0.035
          },
          {
            "name": "막기",
            "value": 13,
            "probability": 0.035
          },
          {
            "name": "생명력",
            "value": 80,
            "probability": 0.0525
          },
          {
            "name": "정신력",
            "value": 40,
            "probability": 0.0525
          }
        ]
      },
      "최상급": {
        "probability": 0.15,
        "stats": [
          {
            "name": "공격력",
            "value": 8,
            "probability": 0.015
          },
          {
            "name": "방어력",
            "value": 75,
            "probability": 0.015
          },
          {
            "name": "추가 명중",
            "value": 13,
            "probability": 0.015
          },
          {
            "name": "추가 회피",
            "value": 13,
            "probability": 0.015
          },
          {
            "name": "치명타",
            "value": 13,
            "probability": 0.015
          },
          {
            "name": "치명타 저항",
            "value": 13,
            "probability": 0.015
          },
          {
            "name": "막기",
            "value": 18,
            "probability": 0.015
          },
          {
            "name": "생명력",
            "value": 130,
            "probability": 0.0225
          },
          {
            "name": "정신력",
            "value": 65,
            "probability": 0.0225
          }
        ]
      }
    }
  },
  "상급 마석 (이벤트)": {
    "grades": {
      "기본": {
        "probability": 0.5,
        "stats": [
          {
            "name": "공격력",
            "value": 3,
            "probability": 0.05
          },
          {
            "name": "방어력",
            "value": 30,
            "probability": 0.05
          },
          {
            "name": "추가 명중",
            "value": 7,
            "probability": 0.05
          },
          {
            "name": "추가 회피",
            "value": 7,
            "probability": 0.05
          },
          {
            "name": "치명타",
            "value": 7,
            "probability": 0.05
          },
          {
            "name": "치명타 저항",
            "value": 7,
            "probability": 0.05
          },
          {
            "name": "막기",
            "value": 10,
            "probability": 0.05
          },
          {
            "name": "생명력",
            "value": 60,
            "probability": 0.07
          },
          {
            "name": "정신력",
            "value": 30,
            "probability": 0.07
          },
          {
            "name": "피해 증폭",
            "value": 10,
            "probability": 0.0025
          },
          {
            "name": "무기 피해 증폭",
            "value": 10,
            "probability": 0.0025
          },
          {
            "name": "치명타 피해 증폭",
            "value": 10,
            "probability": 0.0025
          },
          {
            "name": "후방 피해 증폭",
            "value": 10,
            "probability": 0.0025
          }
        ]
      },
      "상급": {
        "probability": 0.35,
        "stats": [
          {
            "name": "공격력",
            "value": 5,
            "probability": 0.035
          },
          {
            "name": "방어력",
            "value": 50,
            "probability": 0.035
          },
          {
            "name": "추가 명중",
            "value": 10,
            "probability": 0.035
          },
          {
            "name": "추가 회피",
            "value": 10,
            "probability": 0.035
          },
          {
            "name": "치명타",
            "value": 10,
            "probability": 0.035
          },
          {
            "name": "치명타 저항",
            "value": 10,
            "probability": 0.035
          },
          {
            "name": "막기",
            "value": 15,
            "probability": 0.035
          },
          {
            "name": "생명력",
            "value": 100,
            "probability": 0.049
          },
          {
            "name": "정신력",
            "value": 50,
            "probability": 0.049
          },
          {
            "name": "피해 증폭",
            "value": 30,
            "probability": 0.00175
          },
          {
            "name": "무기 피해 증폭",
            "value": 30,
            "probability": 0.00175
          },
          {
            "name": "치명타 피해 증폭",
            "value": 30,
            "probability": 0.00175
          },
          {
            "name": "후방 피해 증폭",
            "value": 30,
            "probability": 0.00175
          }
        ]
      },
      "최상급": {
        "probability": 0.15,
        "stats": [
          {
            "name": "공격력",
            "value": 10,
            "probability": 0.015
          },
          {
            "name": "방어력",
            "value": 100,
            "probability": 0.015
          },
          {
            "name": "추가 명중",
            "value": 15,
            "probability": 0.015
          },
          {
            "name": "추가 회피",
            "value": 15,
            "probability": 0.015
          },
          {
            "name": "치명타",
            "value": 15,
            "probability": 0.015
          },
          {
            "name": "치명타 저항",
            "value": 15,
            "probability": 0.015
          },
          {
            "name": "막기",
            "value": 20,
            "probability": 0.015
          },
          {
            "name": "생명력",
            "value": 160,
            "probability": 0.021
          },
          {
            "name": "정신력",
            "value": 80,
            "probability": 0.021
          },
          {
            "name": "피해 증폭",
            "value": 100,
            "probability": 0.00075
          },
          {
            "name": "무기 피해 증폭",
            "value": 100,
            "probability": 0.00075
          },
          {
            "name": "치명타 피해 증폭",
            "value": 100,
            "probability": 0.00075
          },
          {
            "name": "후방 피해 증폭",
            "value": 100,
            "probability": 0.00075
          }
        ]
      }
    }
  },
  "하급 심연의 영석 (이벤트)": {
    "grades": {
      "기본": {
        "probability": 0.5,
        "stats": [
          {
            "name": "공격력",
            "value": 1,
            "probability": 0.03
          },
          {
            "name": "방어력",
            "value": 10,
            "probability": 0.03
          },
          {
            "name": "추가 명중",
            "value": 5,
            "probability": 0.03
          },
          {
            "name": "추가 회피",
            "value": 5,
            "probability": 0.03
          },
          {
            "name": "치명타",
            "value": 5,
            "probability": 0.03
          },
          {
            "name": "치명타 저항",
            "value": 5,
            "probability": 0.03
          },
          {
            "name": "막기",
            "value": 7,
            "probability": 0.05
          },
          {
            "name": "생명력",
            "value": 30,
            "probability": 0.06
          },
          {
            "name": "정신력",
            "value": 15,
            "probability": 0.06
          },
          {
            "name": "PVP 공격력",
            "value": 2,
            "probability": 0.025
          },
          {
            "name": "PVP 방어력",
            "value": 20,
            "probability": 0.025
          },
          {
            "name": "PVP 명중",
            "value": 10,
            "probability": 0.025
          },
          {
            "name": "PVP 회피",
            "value": 10,
            "probability": 0.025
          },
          {
            "name": "PVP 치명타",
            "value": 10,
            "probability": 0.025
          },
          {
            "name": "PVP 치명타 저항",
            "value": 10,
            "probability": 0.025
          }
        ]
      },
      "상급": {
        "probability": 0.35,
        "stats": [
          {
            "name": "공격력",
            "value": 3,
            "probability": 0.021
          },
          {
            "name": "방어력",
            "value": 30,
            "probability": 0.021
          },
          {
            "name": "추가 명중",
            "value": 7,
            "probability": 0.021
          },
          {
            "name": "추가 회피",
            "value": 7,
            "probability": 0.021
          },
          {
            "name": "치명타",
            "value": 7,
            "probability": 0.021
          },
          {
            "name": "치명타 저항",
            "value": 7,
            "probability": 0.021
          },
          {
            "name": "막기",
            "value": 10,
            "probability": 0.035
          },
          {
            "name": "생명력",
            "value": 60,
            "probability": 0.042
          },
          {
            "name": "정신력",
            "value": 30,
            "probability": 0.042
          },
          {
            "name": "PVP 공격력",
            "value": 6,
            "probability": 0.0175
          },
          {
            "name": "PVP 방어력",
            "value": 60,
            "probability": 0.0175
          },
          {
            "name": "PVP 명중",
            "value": 14,
            "probability": 0.0175
          },
          {
            "name": "PVP 회피",
            "value": 14,
            "probability": 0.0175
          },
          {
            "name": "PVP 치명타",
            "value": 14,
            "probability": 0.0175
          },
          {
            "name": "PVP 치명타 저항",
            "value": 14,
            "probability": 0.0175
          }
        ]
      },
      "최상급": {
        "probability": 0.15,
        "stats": [
          {
            "name": "공격력",
            "value": 5,
            "probability": 0.009
          },
          {
            "name": "방어력",
            "value": 50,
            "probability": 0.009
          },
          {
            "name": "추가 명중",
            "value": 10,
            "probability": 0.009
          },
          {
            "name": "추가 회피",
            "value": 10,
            "probability": 0.009
          },
          {
            "name": "치명타",
            "value": 10,
            "probability": 0.009
          },
          {
            "name": "치명타 저항",
            "value": 10,
            "probability": 0.009
          },
          {
            "name": "막기",
            "value": 15,
            "probability": 0.015
          },
          {
            "name": "생명력",
            "value": 100,
            "probability": 0.018
          },
          {
            "name": "정신력",
            "value": 50,
            "probability": 0.018
          },
          {
            "name": "PVP 공격력",
            "value": 10,
            "probability": 0.0075
          },
          {
            "name": "PVP 방어력",
            "value": 100,
            "probability": 0.0075
          },
          {
            "name": "PVP 명중",
            "value": 20,
            "probability": 0.0075
          },
          {
            "name": "PVP 회피",
            "value": 20,
            "probability": 0.0075
          },
          {
            "name": "PVP 치명타",
            "value": 20,
            "probability": 0.0075
          },
          {
            "name": "PVP 치명타 저항",
            "value": 20,
            "probability": 0.0075
          }
        ]
      }
    }
  },
  "중급 심연의 영석 (이벤트)": {
    "grades": {
      "기본": {
        "probability": 0.5,
        "stats": [
          {
            "name": "공격력",
            "value": 2,
            "probability": 0.03
          },
          {
            "name": "방어력",
            "value": 20,
            "probability": 0.03
          },
          {
            "name": "추가 명중",
            "value": 6,
            "probability": 0.03
          },
          {
            "name": "추가 회피",
            "value": 6,
            "probability": 0.03
          },
          {
            "name": "치명타",
            "value": 6,
            "probability": 0.03
          },
          {
            "name": "치명타 저항",
            "value": 6,
            "probability": 0.03
          },
          {
            "name": "막기",
            "value": 9,
            "probability": 0.05
          },
          {
            "name": "생명력",
            "value": 45,
            "probability": 0.06
          },
          {
            "name": "정신력",
            "value": 23,
            "probability": 0.06
          },
          {
            "name": "PVP 공격력",
            "value": 4,
            "probability": 0.025
          },
          {
            "name": "PVP 방어력",
            "value": 40,
            "probability": 0.025
          },
          {
            "name": "PVP 명중",
            "value": 12,
            "probability": 0.025
          },
          {
            "name": "PVP 회피",
            "value": 12,
            "probability": 0.025
          },
          {
            "name": "PVP 치명타",
            "value": 12,
            "probability": 0.025
          },
          {
            "name": "PVP 치명타 저항",
            "value": 12,
            "probability": 0.025
          }
        ]
      },
      "상급": {
        "probability": 0.35,
        "stats": [
          {
            "name": "공격력",
            "value": 4,
            "probability": 0.021
          },
          {
            "name": "방어력",
            "value": 40,
            "probability": 0.021
          },
          {
            "name": "추가 명중",
            "value": 9,
            "probability": 0.021
          },
          {
            "name": "추가 회피",
            "value": 9,
            "probability": 0.021
          },
          {
            "name": "치명타",
            "value": 9,
            "probability": 0.021
          },
          {
            "name": "치명타 저항",
            "value": 9,
            "probability": 0.021
          },
          {
            "name": "막기",
            "value": 13,
            "probability": 0.035
          },
          {
            "name": "생명력",
            "value": 80,
            "probability": 0.042
          },
          {
            "name": "정신력",
            "value": 40,
            "probability": 0.042
          },
          {
            "name": "PVP 공격력",
            "value": 8,
            "probability": 0.0175
          },
          {
            "name": "PVP 방어력",
            "value": 80,
            "probability": 0.0175
          },
          {
            "name": "PVP 명중",
            "value": 18,
            "probability": 0.0175
          },
          {
            "name": "PVP 회피",
            "value": 18,
            "probability": 0.0175
          },
          {
            "name": "PVP 치명타",
            "value": 18,
            "probability": 0.0175
          },
          {
            "name": "PVP 치명타 저항",
            "value": 18,
            "probability": 0.0175
          }
        ]
      },
      "최상급": {
        "probability": 0.15,
        "stats": [
          {
            "name": "공격력",
            "value": 8,
            "probability": 0.009
          },
          {
            "name": "방어력",
            "value": 75,
            "probability": 0.009
          },
          {
            "name": "추가 명중",
            "value": 13,
            "probability": 0.009
          },
          {
            "name": "추가 회피",
            "value": 13,
            "probability": 0.009
          },
          {
            "name": "치명타",
            "value": 13,
            "probability": 0.009
          },
          {
            "name": "치명타 저항",
            "value": 13,
            "probability": 0.009
          },
          {
            "name": "막기",
            "value": 18,
            "probability": 0.015
          },
          {
            "name": "생명력",
            "value": 130,
            "probability": 0.018
          },
          {
            "name": "정신력",
            "value": 65,
            "probability": 0.018
          },
          {
            "name": "PVP 공격력",
            "value": 16,
            "probability": 0.0075
          },
          {
            "name": "PVP 방어력",
            "value": 150,
            "probability": 0.0075
          },
          {
            "name": "PVP 명중",
            "value": 26,
            "probability": 0.0075
          },
          {
            "name": "PVP 회피",
            "value": 26,
            "probability": 0.0075
          },
          {
            "name": "PVP 치명타",
            "value": 26,
            "probability": 0.0075
          },
          {
            "name": "PVP 치명타 저항",
            "value": 26,
            "probability": 0.0075
          }
        ]
      }
    }
  },
  "상급 심연의 영석 (이벤트)": {
    "grades": {
      "기본": {
        "probability": 0.5,
        "stats": [
          {
            "name": "공격력",
            "value": 3,
            "probability": 0.03
          },
          {
            "name": "방어력",
            "value": 30,
            "probability": 0.03
          },
          {
            "name": "추가 명중",
            "value": 7,
            "probability": 0.03
          },
          {
            "name": "추가 회피",
            "value": 7,
            "probability": 0.03
          },
          {
            "name": "치명타",
            "value": 7,
            "probability": 0.03
          },
          {
            "name": "치명타 저항",
            "value": 7,
            "probability": 0.03
          },
          {
            "name": "막기",
            "value": 10,
            "probability": 0.05
          },
          {
            "name": "생명력",
            "value": 60,
            "probability": 0.06
          },
          {
            "name": "정신력",
            "value": 30,
            "probability": 0.06
          },
          {
            "name": "피해 증폭",
            "value": 10,
            "probability": 0.0025
          },
          {
            "name": "무기 피해 증폭",
            "value": 10,
            "probability": 0.0025
          },
          {
            "name": "치명타 피해 증폭",
            "value": 10,
            "probability": 0.0025
          },
          {
            "name": "후방 피해 증폭",
            "value": 10,
            "probability": 0.0025
          },
          {
            "name": "PVP 공격력",
            "value": 6,
            "probability": 0.0225
          },
          {
            "name": "PVP 방어력",
            "value": 60,
            "probability": 0.0225
          },
          {
            "name": "PVP 명중",
            "value": 14,
            "probability": 0.0225
          },
          {
            "name": "PVP 회피",
            "value": 14,
            "probability": 0.0225
          },
          {
            "name": "PVP 치명타",
            "value": 14,
            "probability": 0.0225
          },
          {
            "name": "PVP 치명타 저항",
            "value": 14,
            "probability": 0.0225
          },
          {
            "name": "PVP 피해 증폭",
            "value": 20,
            "probability": 0.005
          }
        ]
      },
      "상급": {
        "probability": 0.35,
        "stats": [
          {
            "name": "공격력",
            "value": 5,
            "probability": 0.021
          },
          {
            "name": "방어력",
            "value": 50,
            "probability": 0.021
          },
          {
            "name": "추가 명중",
            "value": 10,
            "probability": 0.021
          },
          {
            "name": "추가 회피",
            "value": 10,
            "probability": 0.021
          },
          {
            "name": "치명타",
            "value": 10,
            "probability": 0.021
          },
          {
            "name": "치명타 저항",
            "value": 10,
            "probability": 0.021
          },
          {
            "name": "막기",
            "value": 15,
            "probability": 0.035
          },
          {
            "name": "생명력",
            "value": 100,
            "probability": 0.042
          },
          {
            "name": "정신력",
            "value": 50,
            "probability": 0.042
          },
          {
            "name": "피해 증폭",
            "value": 30,
            "probability": 0.00175
          },
          {
            "name": "무기 피해 증폭",
            "value": 30,
            "probability": 0.00175
          },
          {
            "name": "치명타 피해 증폭",
            "value": 30,
            "probability": 0.00175
          },
          {
            "name": "후방 피해 증폭",
            "value": 30,
            "probability": 0.00175
          },
          {
            "name": "PVP 공격력",
            "value": 10,
            "probability": 0.01575
          },
          {
            "name": "PVP 방어력",
            "value": 100,
            "probability": 0.01575
          },
          {
            "name": "PVP 명중",
            "value": 20,
            "probability": 0.01575
          },
          {
            "name": "PVP 회피",
            "value": 20,
            "probability": 0.01575
          },
          {
            "name": "PVP 치명타",
            "value": 20,
            "probability": 0.01575
          },
          {
            "name": "PVP 치명타 저항",
            "value": 20,
            "probability": 0.01575
          },
          {
            "name": "PVP 피해 증폭",
            "value": 60,
            "probability": 0.0035
          }
        ]
      },
      "최상급": {
        "probability": 0.15,
        "stats": [
          {
            "name": "공격력",
            "value": 10,
            "probability": 0.009
          },
          {
            "name": "방어력",
            "value": 100,
            "probability": 0.009
          },
          {
            "name": "추가 명중",
            "value": 15,
            "probability": 0.009
          },
          {
            "name": "추가 회피",
            "value": 15,
            "probability": 0.009
          },
          {
            "name": "치명타",
            "value": 15,
            "probability": 0.009
          },
          {
            "name": "치명타 저항",
            "value": 15,
            "probability": 0.009
          },
          {
            "name": "막기",
            "value": 20,
            "probability": 0.015
          },
          {
            "name": "생명력",
            "value": 160,
            "probability": 0.018
          },
          {
            "name": "정신력",
            "value": 80,
            "probability": 0.018
          },
          {
            "name": "피해 증폭",
            "value": 100,
            "probability": 0.00075
          },
          {
            "name": "무기 피해 증폭",
            "value": 100,
            "probability": 0.00075
          },
          {
            "name": "치명타 피해 증폭",
            "value": 100,
            "probability": 0.00075
          },
          {
            "name": "후방 피해 증폭",
            "value": 100,
            "probability": 0.00075
          },
          {
            "name": "PVP 공격력",
            "value": 20,
            "probability": 0.00675
          },
          {
            "name": "PVP 방어력",
            "value": 200,
            "probability": 0.00675
          },
          {
            "name": "PVP 명중",
            "value": 30,
            "probability": 0.00675
          },
          {
            "name": "PVP 회피",
            "value": 30,
            "probability": 0.00675
          },
          {
            "name": "PVP 치명타",
            "value": 30,
            "probability": 0.00675
          },
          {
            "name": "PVP 치명타 저항",
            "value": 30,
            "probability": 0.00675
          },
          {
            "name": "PVP 피해 증폭",
            "value": 200,
            "probability": 0.0015
          }
        ]
      }
    }
  },
  "하급 영석 (이벤트)": {
    "grades": {
      "기본": {
        "probability": 0.7,
        "stats": [
          {
            "name": "공격력",
            "value": 1,
            "probability": 0.07
          },
          {
            "name": "방어력",
            "value": 10,
            "probability": 0.07
          },
          {
            "name": "추가 명중",
            "value": 5,
            "probability": 0.07
          },
          {
            "name": "추가 회피",
            "value": 5,
            "probability": 0.07
          },
          {
            "name": "치명타",
            "value": 5,
            "probability": 0.07
          },
          {
            "name": "치명타 저항",
            "value": 5,
            "probability": 0.07
          },
          {
            "name": "막기",
            "value": 7,
            "probability": 0.07
          },
          {
            "name": "생명력",
            "value": 30,
            "probability": 0.105
          },
          {
            "name": "정신력",
            "value": 15,
            "probability": 0.105
          }
        ]
      },
      "상급": {
        "probability": 0.3,
        "stats": [
          {
            "name": "공격력",
            "value": 3,
            "probability": 0.03
          },
          {
            "name": "방어력",
            "value": 30,
            "probability": 0.03
          },
          {
            "name": "추가 명중",
            "value": 7,
            "probability": 0.03
          },
          {
            "name": "추가 회피",
            "value": 7,
            "probability": 0.03
          },
          {
            "name": "치명타",
            "value": 7,
            "probability": 0.03
          },
          {
            "name": "치명타 저항",
            "value": 7,
            "probability": 0.03
          },
          {
            "name": "막기",
            "value": 10,
            "probability": 0.03
          },
          {
            "name": "생명력",
            "value": 60,
            "probability": 0.045
          },
          {
            "name": "정신력",
            "value": 30,
            "probability": 0.045
          }
        ]
      }
    }
  },
  "중급 영석 (이벤트)": {
    "grades": {
      "기본": {
        "probability": 0.5,
        "stats": [
          {
            "name": "공격력",
            "value": 2,
            "probability": 0.05
          },
          {
            "name": "방어력",
            "value": 20,
            "probability": 0.05
          },
          {
            "name": "추가 명중",
            "value": 6,
            "probability": 0.05
          },
          {
            "name": "추가 회피",
            "value": 6,
            "probability": 0.05
          },
          {
            "name": "치명타",
            "value": 6,
            "probability": 0.05
          },
          {
            "name": "치명타 저항",
            "value": 6,
            "probability": 0.05
          },
          {
            "name": "막기",
            "value": 9,
            "probability": 0.05
          },
          {
            "name": "생명력",
            "value": 45,
            "probability": 0.075
          },
          {
            "name": "정신력",
            "value": 23,
            "probability": 0.075
          }
        ]
      },
      "상급": {
        "probability": 0.35,
        "stats": [
          {
            "name": "공격력",
            "value": 4,
            "probability": 0.035
          },
          {
            "name": "방어력",
            "value": 40,
            "probability": 0.035
          },
          {
            "name": "추가 명중",
            "value": 9,
            "probability": 0.035
          },
          {
            "name": "추가 회피",
            "value": 9,
            "probability": 0.035
          },
          {
            "name": "치명타",
            "value": 9,
            "probability": 0.035
          },
          {
            "name": "치명타 저항",
            "value": 9,
            "probability": 0.035
          },
          {
            "name": "막기",
            "value": 13,
            "probability": 0.035
          },
          {
            "name": "생명력",
            "value": 80,
            "probability": 0.0525
          },
          {
            "name": "정신력",
            "value": 40,
            "probability": 0.0525
          }
        ]
      },
      "최상급": {
        "probability": 0.15,
        "stats": [
          {
            "name": "공격력",
            "value": 8,
            "probability": 0.015
          },
          {
            "name": "방어력",
            "value": 75,
            "probability": 0.015
          },
          {
            "name": "추가 명중",
            "value": 13,
            "probability": 0.015
          },
          {
            "name": "추가 회피",
            "value": 13,
            "probability": 0.015
          },
          {
            "name": "치명타",
            "value": 13,
            "probability": 0.015
          },
          {
            "name": "치명타 저항",
            "value": 13,
            "probability": 0.015
          },
          {
            "name": "막기",
            "value": 18,
            "probability": 0.015
          },
          {
            "name": "생명력",
            "value": 130,
            "probability": 0.0225
          },
          {
            "name": "정신력",
            "value": 65,
            "probability": 0.0225
          }
        ]
      }
    }
  },
  "상급 영석 (이벤트)": {
    "grades": {
      "기본": {
        "probability": 0.5,
        "stats": [
          {
            "name": "공격력",
            "value": 3,
            "probability": 0.05
          },
          {
            "name": "방어력",
            "value": 30,
            "probability": 0.05
          },
          {
            "name": "추가 명중",
            "value": 7,
            "probability": 0.05
          },
          {
            "name": "추가 회피",
            "value": 7,
            "probability": 0.05
          },
          {
            "name": "치명타",
            "value": 7,
            "probability": 0.05
          },
          {
            "name": "치명타 저항",
            "value": 7,
            "probability": 0.05
          },
          {
            "name": "막기",
            "value": 10,
            "probability": 0.05
          },
          {
            "name": "생명력",
            "value": 60,
            "probability": 0.07
          },
          {
            "name": "정신력",
            "value": 30,
            "probability": 0.07
          },
          {
            "name": "피해 증폭",
            "value": 10,
            "probability": 0.0025
          },
          {
            "name": "무기 피해 증폭",
            "value": 10,
            "probability": 0.0025
          },
          {
            "name": "치명타 피해 증폭",
            "value": 10,
            "probability": 0.0025
          },
          {
            "name": "후방 피해 증폭",
            "value": 10,
            "probability": 0.0025
          }
        ]
      },
      "상급": {
        "probability": 0.35,
        "stats": [
          {
            "name": "공격력",
            "value": 5,
            "probability": 0.035
          },
          {
            "name": "방어력",
            "value": 50,
            "probability": 0.035
          },
          {
            "name": "추가 명중",
            "value": 10,
            "probability": 0.035
          },
          {
            "name": "추가 회피",
            "value": 10,
            "probability": 0.035
          },
          {
            "name": "치명타",
            "value": 10,
            "probability": 0.035
          },
          {
            "name": "치명타 저항",
            "value": 10,
            "probability": 0.035
          },
          {
            "name": "막기",
            "value": 15,
            "probability": 0.035
          },
          {
            "name": "생명력",
            "value": 100,
            "probability": 0.049
          },
          {
            "name": "정신력",
            "value": 50,
            "probability": 0.049
          },
          {
            "name": "피해 증폭",
            "value": 30,
            "probability": 0.00175
          },
          {
            "name": "무기 피해 증폭",
            "value": 30,
            "probability": 0.00175
          },
          {
            "name": "치명타 피해 증폭",
            "value": 30,
            "probability": 0.00175
          },
          {
            "name": "후방 피해 증폭",
            "value": 30,
            "probability": 0.00175
          }
        ]
      },
      "최상급": {
        "probability": 0.15,
        "stats": [
          {
            "name": "공격력",
            "value": 10,
            "probability": 0.015
          },
          {
            "name": "방어력",
            "value": 100,
            "probability": 0.015
          },
          {
            "name": "추가 명중",
            "value": 15,
            "probability": 0.015
          },
          {
            "name": "추가 회피",
            "value": 15,
            "probability": 0.015
          },
          {
            "name": "치명타",
            "value": 15,
            "probability": 0.015
          },
          {
            "name": "치명타 저항",
            "value": 15,
            "probability": 0.015
          },
          {
            "name": "막기",
            "value": 20,
            "probability": 0.015
          },
          {
            "name": "생명력",
            "value": 160,
            "probability": 0.021
          },
          {
            "name": "정신력",
            "value": 80,
            "probability": 0.021
          },
          {
            "name": "피해 증폭",
            "value": 100,
            "probability": 0.00075
          },
          {
            "name": "무기 피해 증폭",
            "value": 100,
            "probability": 0.00075
          },
          {
            "name": "치명타 피해 증폭",
            "value": 100,
            "probability": 0.00075
          },
          {
            "name": "후방 피해 증폭",
            "value": 100,
            "probability": 0.00075
          }
        ]
      }
    }
  }
};

// 아이템 카테고리 분류
export const ITEM_CATEGORIES = {
  '심연의 마석': ['하급 심연의 마석', '중급 심연의 마석', '상급 심연의 마석'],
  '심연의 영석': ['하급 심연의 영석', '중급 심연의 영석', '상급 심연의 영석'],
  '마석': ['하급 마석', '중급 마석', '상급 마석'],
  '영석': ['하급 영석', '중급 영석', '상급 영석'],
  '심연의 마석 (각인)': ['하급 심연의 마석 (각인)', '중급 심연의 마석 (각인)', '상급 심연의 마석 (각인)'],
  '심연의 영석 (각인)': ['하급 심연의 영석 (각인)', '중급 심연의 영석 (각인)', '상급 심연의 영석 (각인)'],
  '마석 (각인)': ['하급 마석 (각인)', '중급 마석 (각인)', '상급 마석 (각인)'],
  '영석 (각인)': ['하급 영석 (각인)', '중급 영석 (각인)', '상급 영석 (각인)'],
  '심연의 마석 (이벤트)': ['하급 심연의 마석 (이벤트)', '중급 심연의 마석 (이벤트)', '상급 심연의 마석 (이벤트)'],
  '심연의 영석 (이벤트)': ['하급 심연의 영석 (이벤트)', '중급 심연의 영석 (이벤트)', '상급 심연의 영석 (이벤트)'],
  '마석 (이벤트)': ['하급 마석 (이벤트)', '중급 마석 (이벤트)', '상급 마석 (이벤트)'],
  '영석 (이벤트)': ['하급 영석 (이벤트)', '중급 영석 (이벤트)', '상급 영석 (이벤트)'],
};

// 등급 순서
export const GRADE_ORDER = ['기본', '상급', '최상급'];

// 등급 색상
export const GRADE_COLORS: { [key: string]: string } = {
  '기본': 'text-gray-400',
  '상급': 'text-blue-400',
  '최상급': 'text-purple-400',
};

// 아이템 목록 (일반만)
export const NORMAL_ITEMS = [
  '하급 심연의 마석', '중급 심연의 마석', '상급 심연의 마석',
  '하급 심연의 영석', '중급 심연의 영석', '상급 심연의 영석',
  '하급 마석', '중급 마석', '상급 마석',
  '하급 영석', '중급 영석', '상급 영석',
];

// 각인 아이템 목록
export const ENGRAVE_ITEMS = [
  '하급 심연의 마석 (각인)', '중급 심연의 마석 (각인)', '상급 심연의 마석 (각인)',
  '하급 심연의 영석 (각인)', '중급 심연의 영석 (각인)', '상급 심연의 영석 (각인)',
  '하급 마석 (각인)', '중급 마석 (각인)', '상급 마석 (각인)',
  '하급 영석 (각인)', '중급 영석 (각인)', '상급 영석 (각인)',
];

// 이벤트 아이템 목록
export const EVENT_ITEMS = [
  '하급 심연의 마석 (이벤트)', '중급 심연의 마석 (이벤트)', '상급 심연의 마석 (이벤트)',
  '하급 심연의 영석 (이벤트)', '중급 심연의 영석 (이벤트)', '상급 심연의 영석 (이벤트)',
  '하급 마석 (이벤트)', '중급 마석 (이벤트)', '상급 마석 (이벤트)',
  '하급 영석 (이벤트)', '중급 영석 (이벤트)', '상급 영석 (이벤트)',
];
