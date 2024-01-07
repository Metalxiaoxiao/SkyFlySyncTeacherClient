当然，以下是你代码中的接口文档摘要，我会列出支持的命令以及它们的参数和返回值：

### 1. 登录 (login)

#### 请求参数：
- `userId`: 用户ID (float64)
- `deviceType`: 设备类型 (float64)
- `password`: 密码 (string)

#### 返回值：
- 成功时：
  - `status`: "success"
  - `message`: "登录成功"
- 失败时：
  - `status`: "error"
  - `message`: 错误信息

### 2. 注册 (register)

#### 请求参数：
- `userName`: 用户名 (string)
- `deviceType`: 设备类型 (float64)
- `userPassword`: 密码 (string)
- `tag`: 标签 (string，可选)

#### 返回值：
- 成功时：
  - `status`: "success"
  - `message`: 注册成功信息
- 失败时：
  - `status`: "error"
  - `message`: 错误信息

### 3. 注销 (logout)

#### 返回值：
- `status`: "success"
- `message`: "done"

### 4. 获取在线用户状态 (getOnlineUser)

#### 请求参数：
- `id`: 用户ID (float64)

#### 返回值：
- `status`: "success"
- `result`: 在线状态 (true/false)

### 5. 添加班级 (addClass)

#### 请求参数：
- `class`: 班级名称 (string)

#### 返回值：
- 成功时：
  - `status`: "success"
  - `message`: "添加班级成功"
- 失败时：
  - `status`: "error"
  - `message`: 错误信息

### 6. 发送消息 (sendMessage)

#### 请求参数：
- `recipient`: 接收者ID (float64)
- `content`: 消息内容 (interface{})

#### 返回值：
- 成功时：
  - `status`: "success"
  - `message`: 发送成功信息
- 失败时：
  - `status`: "error"
  - `message`: 错误信息

### 7. 接收消息 (receiveMessage)

#### 返回值：
- `command`: "receiveMessage"
- `message`: 收到的消息内容

请注意，文档仅为代码的摘要，并可能需要根据具体情况进行调整。如果有其他需要，请随时告诉我！感谢和你的合作。
