import React, { useEffect, useState } from "react";
import styles from "./course.module.css";
import { Button, Space, Select } from "antd";
import { Comment } from "@/components/comment/comment";
import { useRouter } from "next/router";
import Link from "next/link";

//use 6541c2671eb991e009302df0 as example
const Course = () => {
  //use router to get the url and its query
  const router = useRouter();
  // data variable is what we store data after fetching from database
  const [data, setData] = useState({
    course_info: {},
    all_course_professor: [],
  });
  //semesterIndex variable is used to indicate the current index of chosen semester, when semesterIndex changes, description and schedles in jsx will be changed accordingly
  const [semesterIndex, setSemesterIndex] = useState(0);

  //fetech data and store them into the data variable according to course_professor_id using api that we created in /api/course/search
  const getCourseInfo = async (id) => {
    const response = await fetch(`/api/course/search?id=${id}`);
    if (!response.ok) {
      console.log("response is not ok");
    }
    const data = await response.json();
    setData(data);
    console.log(data);
  };

  //calculate the score bar length pertentage according to score, eg. 4 => "80%"
  const calScorePercentage = (score) => {
    //give 0% when the score is not existed
    if (!score) {
      return "0%";
    }
    //convert score to integer
    let scoreInt = parseInt(score);
    //calculate the division
    let percentage = (scoreInt / 5) * 100;
    //convert percentage to string with %
    return percentage.toString() + "%";
  };

  //useEffect is a function provided by react to detect the variable change, here we detect router change, so every time the url changes(page refresh), we can fetch the data again
  useEffect(() => {
    const { query } = router;

    // get the course_professor_id from url query
    const id = query.id;
    if (id !== undefined) {
      getCourseInfo(id);
    }
  }, [router]);

  return (
    <div className={styles["course-professor"]}>
      <div className={styles.frame}>
        <div className={styles.div}>
          <div className={styles["div-wrapper"]}>
            <p className={styles["text-wrapper"]}>
              {/* I 301 Introduction to Informatics */}
              {data.course_info.courseNumber} {data.course_info.name}
            </p>
          </div>

          <div className={styles["frame-2"]}>
            <div className={styles["frame-3"]}>
              <div className={styles.selection}>
                <div className={styles["frame-4"]}>
                  <div className={styles["frame-5"]}>
                    <img
                      className={styles.img}
                      alt="Teacher"
                      src="/course/teacher.svg"
                    />
                    <div className={styles["text-wrapper-2"]}>Professor</div>
                  </div>
                  <div className={styles["frame-6"]}>
                    {data.all_course_professor.map((item, index) =>
                      item._id.toString() === data._id.toString() ? (
                        <div key={index} className={styles["professor-chosen"]}>
                          <div className={styles["text-wrapper-3"]}>
                            {item.professor.name}
                          </div>
                        </div>
                      ) : (
                        <Link
                          key={index}
                          href={"/course?id=" + item._id.toString()}
                        >
                          <div className={styles["frame-8"]}>
                            <div className={styles["text-wrapper-3"]}>
                              {item.professor.name}
                            </div>
                          </div>
                        </Link>
                      )
                    )}
                  </div>
                  {data.all_course_professor.map((item, index) =>
                    item._id.toString() === data._id.toString() ? (
                      <div key={index} className={styles["frame-9"]}>
                        <img
                          className={styles.teacher}
                          alt="Teacher"
                          src={item.professor.image}
                        />
                        <div className={styles["frame-10"]}>
                          <div className={styles["text-wrapper-5"]}>
                            {item.professor.name}
                          </div>
                          <div className={styles["text-wrapper-6"]}>
                            {item.professor.department}
                          </div>
                          <a
                            className={styles["text-wrapper-7"]}
                            href="mailto:pdoty@ischool.utexas.edu"
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            {item.professor.email}
                          </a>
                        </div>
                      </div>
                    ) : null
                  )}
                </div>
                <div className={styles["frame-12"]}>
                  <div className={styles["text-wrapper-13"]}>
                    Leave a review
                  </div>
                </div>
              </div>
              <div className={styles.description}>
                <div className={styles["frame-4"]}>
                  <div className={styles["frame-5"]}>
                    <img
                      className={styles.img}
                      alt="Date"
                      src="/course/date.svg"
                    />
                    <div className={styles["text-wrapper-2"]}>Semester</div>
                  </div>
                  <div className={styles["frame-6"]}>
                    {data.all_course_professor.map((item, index) =>
                      item._id.toString() === data._id.toString()
                        ? item.semesters.map((semester, index) => (
                            <div
                              className={
                                index === semesterIndex
                                  ? styles["frame-7"]
                                  : styles["frame-8"]
                              }
                              onClick={() => {
                                setSemesterIndex(index);
                              }}
                              key={index}
                            >
                              <div className={styles["text-wrapper-4"]}>
                                {semester.semester}
                              </div>
                            </div>
                          ))
                        : null
                    )}
                  </div>
                </div>
                {data.all_course_professor.map((item, index) =>
                  item._id.toString() === data._id.toString()
                    ? item.semesters.map((semester, index) =>
                        index === semesterIndex ? (
                          <div key={index}>
                            <div className={styles["div-2"]}>
                              <div className={styles["frame-5"]}>
                                <img
                                  className={styles.img}
                                  alt="Description"
                                  src="/course/description.svg"
                                />
                                <div className={styles["text-wrapper-2"]}>
                                  Course description
                                </div>
                              </div>
                              <p className={styles.p}>{semester.description}</p>

                              <div className={styles["frame-9"]}>
                                <div className={styles["frame-5"]}>
                                  <img
                                    className={styles["img-2"]}
                                    alt="Link"
                                    src="/course/link.svg"
                                  />
                                  <a
                                    className={styles["text-wrapper-8"]}
                                    href={
                                      semester.syllabus ? semester.syllabus : ""
                                    }
                                    target="_blank"
                                  >
                                    Syllabus
                                  </a>
                                </div>
                                <div className={styles["frame-5"]}>
                                  <img
                                    className={styles["img-2"]}
                                    alt="Personal"
                                    src="/course/person.svg"
                                  />
                                  <div className={styles["text-wrapper-9"]}>
                                    {semester.method}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className={styles["div-2"]}>
                              <div className={styles["frame-5"]}>
                                <img
                                  className={styles.img}
                                  alt="Schedule"
                                  src="/course/schedule.svg"
                                />
                                <div className={styles["text-wrapper-2"]}>
                                  Schedule
                                </div>
                              </div>
                              <div className={styles["frame-4"]}>
                                <div className={styles["frame-6"]}>
                                  {semester.schedules.map((schedule, index) => (
                                    <div
                                      key={index}
                                      className={styles["frame-11"]}
                                    >
                                      <div className={styles["frame-6"]}>
                                        <div
                                          className={styles["text-wrapper-10"]}
                                        >
                                          {schedule.date}
                                        </div>
                                      </div>
                                      <p className={styles["text-wrapper-11"]}>
                                        {schedule.time}
                                      </p>
                                      <div className={styles["frame-5"]}>
                                        <img
                                          className={styles["img-2"]}
                                          alt="Location"
                                          src="/course/location.svg"
                                        />
                                        <div
                                          className={styles["text-wrapper-12"]}
                                        >
                                          {schedule.location}
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : null
                      )
                    : null
                )}
              </div>
            </div>
            <div className={styles["frame-13"]}>
              <div className={styles["frame-14"]}>
                <div className={styles["frame-15"]}>
                  <div className={styles["text-wrapper-5"]}>Overall score</div>
                  <div className={styles.chart}>
                    <div className={styles["overlap-group"]}>
                      <div className={styles.text}>
                        <p className={styles.element}>
                          <span className={styles.span}>
                            {data.overall_score}{" "}
                          </span>
                          <span className={styles["text-wrapper-14"]}>/ 5</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles["score-chart"]}>
                  {" "}
                  <div className={styles["text-wrapper-15"]}>
                    Based on 51 ratings
                  </div>
                  <div className={styles["line-value"]}>
                    <div className={styles["overlap-group-2"]}>
                      <div className={styles.BG} />
                      <div
                        className={styles.indicator}
                        style={{
                          width: calScorePercentage(data.overall_score),
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className={styles["div-4"]}>
                  <div className={styles["text-wrapper-18"]}>
                    Student ratings
                  </div>
                  {/* <div className={styles["dropdown-trigger"]}>
                  <div className={styles["text-text"]}>
                    <div className={styles["text-2"]}>Most recent</div>
                  </div>
                  <div className={styles["icon-wrapper"]}>
                    <img className={styles.union} alt="Union" src="union.svg" />
                  </div>
                </div> */}
                  <Select
                    defaultValue={1}
                    style={{
                      width: 120,
                    }}
                    // onChange={handleChange}
                    options={[
                      {
                        value: 1,
                        label: "Most recent",
                      },
                      {
                        value: 2,
                        label: "Most view",
                      },
                    ]}
                  />
                </div>
                <div className={styles.ratings}>
                  {[0, 1, 2, 3, 4].map((item, index) => (
                    <div key={index} className={styles["div-2"]}>
                      <div className={styles["frame-16"]}>
                        <div className={styles["frame-17"]}>
                          <div className={styles["text-wrapper-19"]}>4</div>
                        </div>
                        <div className={styles["frame-18"]}>
                          <div className={styles["frame-19"]}>
                            <div className={styles["text-wrapper-5"]}>
                              Jason Thomas :)
                            </div>
                            <div className={styles["text-wrapper-9"]}>
                              Aug 11, 2023
                            </div>
                          </div>
                          <div className={styles["frame-20"]}>
                            <div className={styles["frame-21"]}>
                              <div className={styles["text-wrapper-4"]}>
                                Difficulty
                              </div>
                              <div className={styles["text-wrapper-4"]}>8</div>
                            </div>
                            <div className={styles["frame-21"]}>
                              <div className={styles["text-wrapper-4"]}>
                                Grade
                              </div>
                              <div className={styles["text-wrapper-4"]}>B+</div>
                            </div>
                            <div className={styles["frame-21"]}>
                              <div className={styles["text-wrapper-4"]}>
                                Textbook
                              </div>
                              <div className={styles["text-wrapper-4"]}>No</div>
                            </div>
                            <div className={styles["frame-21"]}>
                              <div className={styles["text-wrapper-4"]}>
                                Attendance
                              </div>
                              <div className={styles["text-wrapper-4"]}>
                                Mandatory
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className={styles.p}>
                        I liked her I went to her office hours a few times and I
                        sat in the front left so the TAs were nearby if we ever
                        had a question on the clicker questions. Sumner answered
                        her emails and I honestly liked her though that&#39;s an
                        unpopular opinion. She does have an accent but I feel
                        she&#39;s easy to understand though her handwriting is
                        just not good.
                      </p>
                      <div className={styles["frame-22"]}>
                        <div className={styles["frame-23"]}>
                          <div className={styles["text-wrapper-20"]}>
                            Beware of Pop Quizzes
                          </div>
                        </div>
                        <div className={styles["frame-23"]}>
                          <div className={styles["text-wrapper-20"]}>
                            Online Savvy
                          </div>
                        </div>
                        <div className={styles["frame-23"]}>
                          <div className={styles["text-wrapper-20"]}>
                            Extra Credit
                          </div>
                        </div>
                        <div className={styles["frame-23"]}>
                          <div className={styles["text-wrapper-20"]}>
                            Super Fun
                          </div>
                        </div>
                        <div className={styles["frame-23"]}>
                          <div className={styles["text-wrapper-20"]}>
                            Super Fun
                          </div>
                        </div>
                      </div>
                      <div className={styles["frame-24"]}>
                        <div className={styles["frame-5"]}>
                          <img
                            className={styles.img}
                            alt="Vector"
                            src="/course/vector.svg"
                          />
                          <div className={styles["text-wrapper-11"]}>1.2k</div>
                        </div>
                        <div className={styles["frame-5"]}>
                          <img
                            className={styles.img}
                            alt="Vector"
                            src="/course/vector-down.svg"
                          />
                          <div className={styles["text-wrapper-11"]}>25</div>
                        </div>
                        <div className={styles["frame-5"]}>
                          <img
                            className={styles.vector}
                            alt="Vector"
                            src="/course/reply.svg"
                          />
                          <div className={styles["text-wrapper-11"]}>37</div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className={styles["div-2"]}>
                    <div className={styles["frame-16"]}>
                      <div className={styles["frame-17"]}>
                        <div className={styles["text-wrapper-19"]}>4</div>
                      </div>
                      <div className={styles["frame-18"]}>
                        <div className={styles["frame-19"]}>
                          <div className={styles["text-wrapper-5"]}>
                            Jason Thomas :)
                          </div>
                          <div className={styles["text-wrapper-9"]}>
                            Aug 11, 2023
                          </div>
                        </div>
                        <div className={styles["frame-20"]}>
                          <div className={styles["frame-21"]}>
                            <div className={styles["text-wrapper-3"]}>
                              Difficulty
                            </div>
                            <div className={styles["text-wrapper-3"]}>8</div>
                          </div>
                          <div className={styles["frame-21"]}>
                            <div className={styles["text-wrapper-3"]}>
                              Grade
                            </div>
                            <div className={styles["text-wrapper-3"]}>B+</div>
                          </div>
                          <div className={styles["frame-21"]}>
                            <div className={styles["text-wrapper-3"]}>
                              Textbook
                            </div>
                            <div className={styles["text-wrapper-3"]}>No</div>
                          </div>
                          <div className={styles["frame-21"]}>
                            <div className={styles["text-wrapper-3"]}>
                              Attendance
                            </div>
                            <div className={styles["text-wrapper-3"]}>
                              Mandatory
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className={styles.p}>
                      I liked her I went to her office hours a few times and I
                      sat in the front left so the TAs were nearby if we ever
                      had a question on the clicker questions. Sumner answered
                      her emails and I honestly liked her though that&#39;s an
                      unpopular opinion. She does have an accent but I feel
                      she&#39;s easy to understand though her handwriting is
                      just not good.
                    </p>
                    <div className={styles["frame-22"]}>
                      <div className={styles["frame-23"]}>
                        <div className={styles["text-wrapper-20"]}>
                          Beware of Pop Quizzes
                        </div>
                      </div>
                      <div className={styles["frame-23"]}>
                        <div className={styles["text-wrapper-20"]}>
                          Online Savvy
                        </div>
                      </div>
                      <div className={styles["frame-23"]}>
                        <div className={styles["text-wrapper-20"]}>
                          Extra Credit
                        </div>
                      </div>
                      <div className={styles["frame-23"]}>
                        <div className={styles["text-wrapper-20"]}>
                          Super Fun
                        </div>
                      </div>
                      <div className={styles["frame-23"]}>
                        <div className={styles["text-wrapper-20"]}>
                          Super Fun
                        </div>
                      </div>
                    </div>
                    <div className={styles["frame-24"]}>
                      <div className={styles["frame-5"]}>
                        <img
                          className={styles.img}
                          alt="Vector"
                          src="/course/vector.svg"
                        />
                        <div className={styles["text-wrapper-11"]}>1.2k</div>
                      </div>
                      <div className={styles["frame-5"]}>
                        <img
                          className={styles.img}
                          alt="Vector"
                          src="/course/vector-down.svg"
                        />
                        <div className={styles["text-wrapper-11"]}>25</div>
                      </div>
                      <div className={styles["frame-5"]}>
                        <img
                          className={styles.vector}
                          alt="Vector"
                          src="/course/reply.svg"
                        />
                        <div className={styles["text-wrapper-11"]}>37</div>
                      </div>
                    </div>
                  </div>
                  {/* <img
                  className={styles["line-2"]}
                  alt="Line"
                  src="line-1-2.svg"
                /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Course;
