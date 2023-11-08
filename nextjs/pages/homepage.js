import styles from "./homepage_yiwei.module.css";
import React from "react";
import Searchbox from "@/components/Search/searchBox2";
//import Searchbox from "../components/search/searchBox2.js";

export default function Home() {
  return (
    <div className={styles.Homepage}>
      <div className={styles["frame-1"]}>
        <img
          className={styles.UT}
          alt="UT Background"
          src="/homepage-UI/UTBackground.png"
        />
        <div className={styles["inner_wrapper"]}>
          <div className={styles["element_wrapper"]}>
            {/* <div className={styles["log_in_wrapper"]}>
              <img
                className={styles.login}
                alt="login icon"
                src="/homepage-UI/log_in.png"
              />
              <p className={styles["logintext"]}>Login</p>
            </div> */}
            <div className={styles["Heading_wrapper"]}>
              <p className={styles["heading"]}>
                Find a course rating at <br></br>The University of Texas at
                Austin{" "}
              </p>
            </div>
            <div className={styles["searchbar_wrapper"]}>
              <Searchbox />
            </div>
          </div>
        </div>
      </div>

      <div className={styles["frame-2"]}>
        <div className={styles["div-wrapper"]}>
          <p className={styles["text-wrapper"]}>Popular Search Result</p>
          <div className={styles["class-wrapper"]}>
            <div className={styles["pframe1"]}>
              <div className={styles["p1-wrapper"]}>
                <img
                  className={styles.classImage}
                  alt="Introduction to Informatics"
                  src="/homepage-UI/class_intro.png"
                />
              </div>
              <p className={styles["class_title"]}>
                I301 Introduction to informatics
              </p>
              <p className={styles["offer_semester"]}>Fall 2022</p>
            </div>
            <div className={styles["pframe2"]}>
              <div className={styles["p2-wrapper"]}>
                <img
                  className={styles.classImage}
                  alt="Statistics of Informatics"
                  src="/homepage-UI/class_stats.png"
                />
              </div>
              <p className={styles["class_title"]}>
                I306 Statistics for Informatics
              </p>
              <p className={styles["offer_semester"]}>Fall 2021</p>
            </div>
            <div className={styles["pframe3"]}>
              <div className={styles["p2-wrapper"]}>
                <img
                  className={styles.classImage}
                  alt="Health Informatics"
                  src="/homepage-UI/class_health.png"
                />
              </div>
              <p className={styles["class_title"]}>
                INF 385N Consumer Health Informatics
              </p>
              <p className={styles["offer_semester"]}>Spring 2022</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
