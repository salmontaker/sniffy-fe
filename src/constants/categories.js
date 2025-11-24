const categories = [
  {
    category: "가방",
    subcategory: ["여성용가방", "남성용가방", "기타가방"]
  },
  {
    category: "귀금속",
    subcategory: ["반지", "목걸이", "귀걸이", "시계", "기타"]
  },
  {
    category: "도서용품",
    subcategory: ["학습서적", "소설", "컴퓨터서적", "만화책", "기타서적"]
  },
  {
    category: "서류",
    subcategory: ["서류", "기타물품"]
  },
  {
    category: "산업용품",
    subcategory: ["기타물품"]
  },
  {
    category: "쇼핑백",
    subcategory: ["쇼핑백"]
  },
  {
    category: "스포츠용품",
    subcategory: ["스포츠용품"]
  },
  {
    category: "악기",
    subcategory: ["건반악기", "관악기", "타악기", "현악기", "기타악기"]
  },
  {
    category: "유가증권",
    subcategory: ["어음", "상품권", "채권", "기타"]
  },
  {
    category: "의류",
    subcategory: ["여성의류", "남성의류", "아기의류", "모자", "신발", "기타의류"]
  },
  {
    category: "자동차",
    subcategory: ["자동차열쇠", "네비게이션", "자동차번호판", "임시번호판", "기타용품"]
  },
  {
    category: "전자기기",
    subcategory: ["태블릿", "스마트워치", "무선이어폰", "카메라", "기타용품"]
  },
  {
    category: "지갑",
    subcategory: ["여성용 지갑", "남성용 지갑", "기타 지갑"]
  },
  {
    category: "증명서",
    subcategory: ["신분증", "면허증", "여권", "기타"]
  },
  {
    category: "컴퓨터",
    subcategory: ["삼성노트북", "LG노트북", "애플노트북", "기타"]
  },
  {
    category: "카드",
    subcategory: ["신용(체크)카드", "일반카드", "교통카드", "기타카드"]
  },
  {
    category: "현금",
    subcategory: ["현금", "수표", "외화", "기타"]
  },
  {
    category: "휴대폰",
    subcategory: ["삼성휴대폰", "LG휴대폰", "아이폰", "기타휴대폰", "기타통신기기"]
  },
  {
    category: "기타물품",
    subcategory: ["안경", "선글라스", "매장문화재", "기타"]
  },
  {
    category: "유류품",
    subcategory: ["유류품"]
  }
];

const categoryOptions = [];
categories.forEach((cat) => {
  categoryOptions.push(cat.category);
  cat.subcategory.forEach((sub) => {
    if (cat.category !== sub) {
      categoryOptions.push(`${cat.category} > ${sub}`);
    }
  });
});

export default categoryOptions;
