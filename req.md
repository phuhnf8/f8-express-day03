<div class="f8-text-content _wrapper_1d8vh_1"><h3>1. Yêu cầu chung</h3>
<ul>
<li>
<p>Tạo repo mới đặt tên phù hợp</p>
</li>
<li>
<p>Setup dự án Express mới và tạo file <code>/server.js</code>, chạy http server tại <code>localhost:3000</code></p>
</li>
<li>
<p>Xem 2 video hướng dẫn tại chương "Làm việc với ExpressJS":</p>
<ul>
<li>
<p>Hướng dẫn cài đặt MySQL</p>
</li>
<li>
<p>Cách tạo bảng trong MySQL</p>
</li>
</ul>
</li>
</ul>
<hr>
<h3>2. Chuẩn hóa response và xử lý lỗi</h3>
<p>Tạo file <code>/server.js</code> và folder <code>/src/middlewares</code> với các file middleware bên trong.</p>
<ol>
<li>
<p>Tạo middleware <code>responseFormat.js</code> thêm 2 method vào res object:</p>

```js
res.success(data, (status = 200)); // trả về JSON { status: "success", data }
res.error(status, message, (error = null)); // trả về JSON { status: "error", error, message }
```

</li>
<li>
<p>Tạo middleware <code>notFoundHandler.js</code> xử lý route không tồn tại, sử dụng:</p>

```js
res.error(404, "Resource not found"); // để trả về response chuẩn hóa
```

</li>
<li>
<p>Tạo middleware <code>exceptionHandler.js</code> có 4 tham số <code>(err, req, res, next)</code> xử lý exception, sử dụng:</p>

```js
res.error(500, err.message, err); // để trả về response chuẩn hóa
```

</li>
<li>
<p>Trong <code>server.js</code> sử dụng 3 middleware theo đúng thứ tự: <code>responseFormat</code> đầu tiên, sau đó các route, cuối cùng <code>notFoundHandler</code> và <code>exceptionHandler</code></p>
</li>
<li>
<p>Tạo route GET <code>/test-success</code> trả về:</p>

```js
res.success({ message: "Hello World" }); // để test middleware success
```

</li>
<li>
<p>Tạo route GET <code>/test-error</code>:</p>

```js
throw Error("Test exception"); // để test middleware exception handler
```

</li>
</ol>
<hr>
<h3>3. Tạo middleware Rate limiting</h3>
<p>Tạo file <code>/src/middlewares/rateLimiter.js</code></p>
<ol>
<li>
<p>Export function <code>createRateLimiter</code> nhận object config có 3 thuộc tính: <code>windowMs</code> (thời gian cửa sổ tính bằng milliseconds), <code>maxRequests</code> (số request tối đa), <code>message</code> (thông báo lỗi)</p>
</li>
<li>
<p>Function trả về middleware function có signature <code>(req, res, next)</code> để sử dụng trong Express app</p>
</li>
<li>
<p>Middleware theo dõi số lượng request từ mỗi IP address trong khoảng thời gian <code>windowMs</code></p>
</li>
<li>
<p>Khi IP vượt quá <code>maxRequests</code> trong cửa sổ thời gian, trả về response status 429 với JSON <code>{ error: message }</code></p>
</li>
<li>
<p>Sau khi hết thời gian <code>windowMs</code>, reset counter cho IP đó về 0</p>
</li>
<li>
<p>Export sẵn instance <code>apiRateLimiter</code> với config mặc định: windowMs = 60000, maxRequests = 100, message = "Too many requests"</p>
</li>
<li>
<p>Middleware cho phép request tiếp tục bằng cách gọi <code>next()</code> khi chưa vượt giới hạn</p>
</li>
</ol>
<hr>
<h3>4. Sử dụng MySQL Database cho tasks API</h3>
<p>Tạo file <code>/src/config/database.js</code> để kết nối MySQL và file <code>/src/models/task.model.js</code> cho model Task.</p>
<ol>
<li>
<p>Thiết lập kết nối MySQL database tên <code>todo_dev</code>, tạo table <code>tasks</code> với các cột: <code>id</code> (primary key, auto increment), <code>title</code> (varchar 255), <code>completed</code> (boolean default false), <code>created_at</code> (timestamp), <code>updated_at</code> (timestamp)</p>
</li>
<li>
<p>Viết method <code>findAll()</code> trả về tất cả tasks từ database</p>
</li>
<li>
<p>Viết method <code>findOne(id)</code> tìm task theo id, trả về object task hoặc null nếu không tìm thấy</p>
</li>
<li>
<p>Viết method <code>create(taskData)</code> thêm task mới vào database, trả về task vừa tạo với id được generate</p>
</li>
<li>
<p>Viết method <code>update(id, taskData)</code> cập nhật task theo id, trả về số dòng bị ảnh hưởng</p>
</li>
<li>
<p>Viết method <code>destroy(id)</code> xóa task theo id, trả về số dòng bị xóa</p>
</li>
<li>
<p>Cập nhật controller để sử dụng các methods từ Task model thay vì đọc/ghi file JSON</p>
</li>
</ol>
<p><strong>Demo queries:</strong></p>

```sql
-- Find all
SELECT *
FROM posts
ORDER BY created_at DESC;

-- Find one
SELECT *
FROM posts
WHERE id = 1;

-- Insert
INSERT INTO posts (title, content)
VALUES ('Sample Title', 'Sample Content');

-- Update
UPDATE posts
SET title = 'Updated Title'
WHERE id = 1;

-- Delete
DELETE FROM posts
WHERE id = 1;
```

<p>Response trả về cần sử dụng <code>res.success</code> và <code>res.error</code> đảm bảo chuẩn hóa định dạng trả về.</p></div>
