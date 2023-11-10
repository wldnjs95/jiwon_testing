import Image from "next/image";
import styles from "./jiwonpage.module.css";
import Searchbox from "@/components/Search/searchBox";
import ListGroup from "@/components/Search/ListGroup";
import Link from "next/link";
import FilterCombo from "./customFilter.js";
import React, { useState, useEffect } from 'react';
import { connectDB } from "@/util/database";

// FilterCombo 컴포넌트에 전달할 고유한 필터 옵션을 추출하는 함수
function extractAndStructureFilterOptions(searchResults, field) {
  console.log('[Function] extractFilterOptions executed');

  // extract options
  const options = new Set(searchResults.map(result => result[field]));
  const optionsArray = Array.from(options); // to Set
  console.log('options = ' + JSON.stringify(optionsArray, null, 2));


  // change structure
  const structuredOptions = optionsArray.map(option => {
    const acronym = option
      .split(' ')
      .map(word => word.charAt(0).toUpperCase()) // to upper case
      .join(''); 
    return {
      value: acronym,
      label: option
    };
  });

  console.log('Structured options : ', JSON.stringify(structuredOptions, null, 2))
  return structuredOptions;
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

// first page load default set

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

  //filter state
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedProfessor, setSelectedProfessor] = useState(null);

  // return filter results
  const getFilteredResults = () => {
    return searchResults.filter(result => {
      return (selectedCourse ? result.course === selectedCourse : true) &&
        (selectedProfessor ? result.professor === selectedProfessor : true);
    });
  };

  //selecting filter
  const handleCourseFilterChange = (course) => {
    setSelectedCourse(course);
  };
  const handleProfessorFilterChange = (professor) => {
    setSelectedProfessor(professor);
  };

  // render by filter results
  const filteredResults = getFilteredResults();

  //default filter state
  useEffect(() => {
    const courseOptions = extractAndStructureFilterOptions(courses, 'course');
    setCourseOptions(courseOptions);

    const professorOptions = extractAndStructureFilterOptions(courses, 'professor');
    setProfessorOptions(professorOptions);
  }, []);


  const handleSearchResults = (results) => {
    console.log('[jiwonpage.js][handleSearchResults] executed');
    // set search Result
    setSearchResults(results);
    console.log('results = ' + JSON.stringify(results, null, 2));

    // extract and change structure
    const courseOptions = extractAndStructureFilterOptions(results, 'course');
    setCourseOptions(courseOptions);
    console.log('courseOptions : ' + JSON.stringify(courseOptions, null, 2));

    // prof
    const professorOptions = extractAndStructureFilterOptions(results, 'professor');
    setProfessorOptions(professorOptions);
    console.log('professorOptions : ' + JSON.stringify(professorOptions, null, 2));
  };


  return (
    <div className={styles["search-list"]}>
      <div className={styles["ut-logo"]}>
        <Image src="/UT_logo.svg" alt="UT Logo SVG" width={841} height={65} priority />
      </div>
      <Searchbox onSearchResult={handleSearchResults} />

      <div className={styles["filter"]}>
        <p className={styles["filter-title"]}>Filter by ...</p>
        <div className={styles["filters-row"]}>
          <FilterCombo items={courseOptions} placeholder="Course" onSelect={handleCourseFilterChange} />
          <FilterCombo items={professorOptions} placeholder="Professor"  onSelect={handleProfessorFilterChange} />
        </div>
      </div>



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

