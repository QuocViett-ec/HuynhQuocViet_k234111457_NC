const express = require("express"); //khởi tạo thu viện express

const app = express();
const port = 3000;
const morgan = require("morgan");
app.use(morgan("combined"));
//create default API
app.get("/", (req, res) => {
  res.send("Hello cục dàng !");
});
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
// dấu `` là để viết tên biến

const cors = require("cors");
app.use(cors());
//tạo API /books trả về danh sách sách

const path = require("path");
app.use("/static", express.static(path.join(__dirname, "public")));
//tạo đường dẫn ảo /images cho thư mục public/images

let database = [
  {
    BookId: "b1",
    BookName: "Kỹ thuật lập trình cơ bản",
    Price: 70,
    Image: "cochangtrai.jpg",
  },
  {
    BookId: "b2",
    BookName: "Kỹ thuật lập trình nâng cao",
    Price: 100,
    Image: "b2.jpg",
  },
  { BookId: "b3", BookName: "Máy học cơ bản", Price: 200, Image: "b3.jpg" },
  { BookId: "b4", BookName: "Máy học nâng cao", Price: 300, Image: "b4.webp" },
  {
    BookId: "b5",
    BookName: "Lập trình Robot cơ bản",
    Price: 250,
    Image: "b5.webp",
  },
];
app.get("/books", (req, res) => {
  res.send(database);
});
