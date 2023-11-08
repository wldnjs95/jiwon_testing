import Image from "next/image";
import styles from "./jiwonpage.module.css";
import Searchbox from "@/components/Search/searchBox";
import ListGroup from "@/components/Search/ListGroup";
import Link from "next/link";
import FilterCombo from "./customFilter.js";
import React, { useState } from 'react';
import { connectDB } from "@/util/database";

// FilterCombo 컴포넌트에 전달할 고유한 필터 옵션을 추출하는 함수
function extractFilterOptions(searchResults, field) {
  // 주어진 필드로부터 모든 고유한 값을 추출합니다.
  const options = new Set(searchResults.map(result => result[field]));
  return Array.from(options);
}

function toTitleCase(str) {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

const defaultGroupData = {
  _id: "1",
  course: "Introduction to Informatics",
  professor: "Philip Doty",
  latestReview: "This is default content value",
  averageRating: 4.5,
  reviewCount: 20
}

export async function getServerSideProps() {
  // database connection, accesing full list of the document
  const db = (await connectDB).db("AAAA");
  const courses = await db.collection('GroupList').find({}).toArray();
  return {
    props: {
      courses: JSON.parse(JSON.stringify(courses)),
      // MongoDB serialization
    },
  };
}


export default function Home({ courses }) {

  const [searchResults, setSearchResults] = useState(courses || []);
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [courseOptions, setCourseOptions] = useState([]);
  const [professorOptions, setProfessorOptions] = useState([]);

  const handleSearchResults = (results) => {
    setSearchResults(results);
    setDepartmentOptions(extractFilterOptions(results, 'department'));
    setCourseOptions(extractFilterOptions(results, 'course'));
    setProfessorOptions(extractFilterOptions(results, 'professor'));
  };

  return (
    <div className={styles["search-list"]}>
      <div className={styles["ut-logo"]}>
        <Image src="/UT_logo.svg" alt="UT Logo SVG" width={841} height={65} />
      </div>
      <Searchbox onSearchResult={handleSearchResults} />

      <div className={styles["filter"]}>
        <p className={styles["filter-title"]}>Filter by ...</p>
        <div className={styles["filters-row"]}>
          <FilterCombo placeholder="Department" />
          <FilterCombo placeholder="Course" />
          <FilterCombo placeholder="Professor" />
        </div>{" "}
        {/*filters-row*/}
      </div>{" "}
      {/*filter div*/}



      <div className={styles["grouped-list"]}>

        {searchResults.length > 0 ? (
          searchResults.map((result) => {

            const courseName = toTitleCase(result.course);
            const professorName = toTitleCase(result.professor);
            const reviewContent = defaultGroupData.latestReview;
            const averageRating = defaultGroupData.averageRating;
            const reviewCount = defaultGroupData.reviewCount;

            return (

              <ListGroup
                key={result._id}
                courseName={courseName}
                professorName={professorName}
                reviewContent={reviewContent}
                averageRating={averageRating}
                reviewCount={reviewCount}
              />
            );
          })
        ) : (
          <div className={styles["no-results"]}>
            <p>No results found</p>
          </div>
        )}
      </div>
    </div>
  );
}

/*repeated content -> to components
should I write this to new file..?? */

