import styles from "./searchBox.module.css";
import Image from "next/image";
import { useState } from "react";

export default function SearchBox({ onSearchResult }) { // prop을 여기서 받습니다.
  const [query, setQuery] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/search?myQuery=${query}`);
      const searchData = await response.json();
      onSearchResult(searchData); // 부모 컴포넌트의 상태를 업데이트하는 함수를 사용합니다.
    } catch (error) {
      console.error("Error during API request:", error);
    }
  };

  return (
    <form onSubmit={handleSearch} className={styles["search-box"]}>
      <input
        className={styles["search-input"]}
        type="text"
        placeholder="Search for ..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      ></input>
      <button type="submit" className={styles["search-icon"]} onClick={handleSearch}>
        <Image src="/searchicon.svg" width={30} height={30} />
      </button>
    </form>
  );
}
