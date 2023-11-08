import styles from "./login_yiwei.module.css";
import React from "react";
import { Button, Checkbox, Form, Input } from "antd";

export default function Login() {
  const onFinish = (values) => {
    console.log("Success:", values);
    window.alert(values.password);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const topBarStyle = {
    background: "#C2570C", // Orange color for the top bar
    // width: "1800px", // Set the width to 1440 pixels
    height: "92px", // Set the height to 92 pixels
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "10px", // Add padding as needed
    /* Add other styles as needed */
  };

  return (
    <div>
      {/* Top Orange Bar */}
      <div style={topBarStyle}>
        {/* You can style the top bar as needed */}
        {/* Add content for the top bar here */}
      </div>

      {/* <img
        src="/Login-UI/UtexasLogo.png"
        alt="Login Image"
        className={styles.UtexasLogo}
      /> */}

      <div className={`${styles.container} ${styles.whiteBackground}`}>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="UT EID"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          {/* <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item> */}

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button className={styles.myButton}>Sign In</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
