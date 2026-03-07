const express = require("express");
const app = express();
const port = 3002;
const morgan = require("morgan");
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cors = require("cors");
app.use(cors({ origin: true, credentials: true }));
app.listen(port, () => {
  console.log(`My Server listening on port ${port}`);
});
app.get("/", (req, res) => {
  res.send("This Web server is processed for MongoDB");
});
const { MongoClient, ObjectId } = require("mongodb");
client = new MongoClient("mongodb://127.0.0.1:27017");
client.connect();
database = client.db("FashionData");
fashionCollection = database.collection("Fashion");
userCollection = database.collection("User");
onclassDb = client.db("OnClass");
logginCollection = onclassDb.collection("Loggin");

// ─── Seed sample Fashion data (3 styles × 3-5 items each) ─────────────────
async function initSampleFashions() {
  // If collection has old-format documents (missing fashion_title), wipe and reseed
  const hasNew = await fashionCollection.findOne({
    fashion_title: { $exists: true },
  });
  if (hasNew) return; // already has correct-format data
  await fashionCollection.deleteMany({}); // clear legacy data if any
  const now = new Date();
  const sample = [
    // STREET STYLE
    {
      fashion_title: "Phil Oh's Best Street Style – Paris Fall 2023",
      fashion_details:
        "<p>There are two street style camps in Paris this season—those willing to brave the cold and go coatless, and others bundling up in their warmest furs and scarves. Phil Oh has captured the best of both approaches.</p>",
      thumbnail:
        "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&h=500&fit=crop&auto=format",
      fashion_style: "Street Style",

      creation_date: new Date(now - 5 * 86400000),
    },
    {
      fashion_title: "Phil Oh's Best Street Style – Milan Fall 2023",
      fashion_details:
        "<p>Milan delivers bold silhouettes and sculptural accessories. Phil Oh roams the cobblestones to capture the city's most daring looks.</p>",
      thumbnail:
        "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=500&fit=crop&auto=format",
      fashion_style: "Street Style",
      creation_date: new Date(now - 4 * 86400000),
    },
    {
      fashion_title: "Phil Oh's Best Street Style – London Fall 2023",
      fashion_details:
        "<p>London's street style scene mixes classic British tailoring with avant-garde experimentation. Phil Oh is on the ground to document every look.</p>",
      thumbnail:
        "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400&h=500&fit=crop&auto=format",
      fashion_style: "Street Style",
      creation_date: new Date(now - 3 * 86400000),
    },
    {
      fashion_title: "Vivienne Westwood Is Remembered in London",
      fashion_details:
        "<p>Friends and fans of the late designer gather in London to celebrate her iconic legacy and rebellious spirit that changed fashion forever.</p>",
      thumbnail:
        "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=500&fit=crop&auto=format",
      fashion_style: "Street Style",
      creation_date: new Date(now - 2 * 86400000),
    },
    // TRENDS
    {
      fashion_title: "Why the Short Suit Should Be Your Next Spring Investment",
      fashion_details:
        "<p>The short suit is having a major moment. Lightweight fabrics, relaxed tailoring and bold colours make it the ultimate transitional piece for spring.</p>",
      thumbnail:
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=500&fit=crop&auto=format",
      fashion_style: "Trends",
      creation_date: new Date(now - 6 * 86400000),
    },
    {
      fashion_title:
        "Is This the Trend of the Future? AI Interprets the Fall 2023 Menswear Season",
      fashion_details:
        "<p>Artificial intelligence meets the runway as designers experiment with algorithmic aesthetics and data-driven silhouettes for menswear.</p>",
      thumbnail:
        "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400&h=500&fit=crop&auto=format",
      fashion_style: "Trends",
      creation_date: new Date(now - 7 * 86400000),
    },
    {
      fashion_title: "What Street Style Looked Like a Decade Ago",
      fashion_details:
        "<p>We look back at the defining street style moments of the early 2010s, from chunky sneakers to maximalist layering that shaped today's looks.</p>",
      thumbnail:
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=500&fit=crop&auto=format",
      fashion_style: "Trends",
      creation_date: new Date(now - 8 * 86400000),
    },
    {
      fashion_title: "Men, Skirts Aren't That Scary—Promise!",
      fashion_details:
        "<p>The gender-fluid fashion movement continues to push boundaries. This season's runways confirm that skirts for men are here to stay—and they look incredible.</p>",
      thumbnail:
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=500&fit=crop&auto=format&hue=45",
      fashion_style: "Trends",
      creation_date: new Date(now - 9 * 86400000),
    },
    // CASUAL
    {
      fashion_title: "Oversized Denim: The Comfort-First Look for Spring",
      fashion_details:
        "<p>Baggy jeans, oversized denim jackets, and relaxed denim sets dominate the casual scene. Pair with a simple white tee for an effortlessly cool outfit.</p>",
      thumbnail:
        "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=500&fit=crop&auto=format",
      fashion_style: "Casual",
      creation_date: new Date(now - 10 * 86400000),
    },
    {
      fashion_title: "The Everyday Sneaker Edit: Best Picks of 2023",
      fashion_details:
        "<p>From classic white kicks to bold chunky soles, these are the sneakers that defined casual dressing in 2023. Comfort has never looked this good.</p>",
      thumbnail:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=500&fit=crop&auto=format",
      fashion_style: "Casual",
      creation_date: new Date(now - 11 * 86400000),
    },
    {
      fashion_title: "Linen Sets: Your Summer Wardrobe Essential",
      fashion_details:
        "<p>Breathable, stylish, and versatile—linen co-ords are the season's must-have for relaxed daywear. Available in earthy neutrals and soft pastels.</p>",
      thumbnail:
        "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&h=500&fit=crop&auto=format",
      fashion_style: "Casual",
      creation_date: new Date(now - 12 * 86400000),
    },
  ];
  await fashionCollection.insertMany(sample);
  console.log("Sample Fashion data seeded (", sample.length, "items)");
}
initSampleFashions();

// ─── Migration: fix broken thumbnail URLs in existing documents ──────────────
const UNSPLASH_THUMB_MAP = {
  "Phil Oh's Best Street Style \u2013 Paris Fall 2023": "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&h=500&fit=crop&auto=format",
  "Phil Oh's Best Street Style \u2013 Milan Fall 2023": "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=500&fit=crop&auto=format",
  "Phil Oh's Best Street Style \u2013 London Fall 2023": "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400&h=500&fit=crop&auto=format",
  "Vivienne Westwood Is Remembered in London": "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=500&fit=crop&auto=format",
  "Why the Short Suit Should Be Your Next Spring Investment": "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=500&fit=crop&auto=format",
  "Is This the Trend of the Future? AI Interprets the Fall 2023 Menswear Season": "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400&h=500&fit=crop&auto=format",
  "What Street Style Looked Like a Decade Ago": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=500&fit=crop&auto=format",
  "Men, Skirts Aren't That Scary\u2014Promise!": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=500&fit=crop&auto=format&hue=45",
  "Oversized Denim: The Comfort-First Look for Spring": "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=500&fit=crop&auto=format",
  "The Everyday Sneaker Edit: Best Picks of 2023": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=500&fit=crop&auto=format",
  "Linen Sets: Your Summer Wardrobe Essential": "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&h=500&fit=crop&auto=format",
};
const BLOCKED_DOMAINS = ["vogue.com", "wwd.com", "hypb.st", "beigebrown.com", "theneguide.com"];
async function fixBrokenThumbnails() {
  try {
    const docs = await fashionCollection.find({}).toArray();
    let fixedCount = 0;
    for (const doc of docs) {
      const broken = !doc.thumbnail || BLOCKED_DOMAINS.some(d => (doc.thumbnail || "").includes(d));
      if (broken) {
        const newThumb = UNSPLASH_THUMB_MAP[doc.fashion_title] ||
          "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&h=500&fit=crop&auto=format";
        await fashionCollection.updateOne({ _id: doc._id }, { $set: { thumbnail: newThumb } });
        fixedCount++;
      }
    }
    if (fixedCount > 0) console.log(`[Migration] Fixed ${fixedCount} broken thumbnail(s).`);
    else console.log("[Migration] All thumbnails OK.");
  } catch (err) {
    console.error("[Migration] fixBrokenThumbnails error:", err.message);
  }
}
fixBrokenThumbnails();

// Tạo sample Users trong FashionData nếu chưa có
async function initSampleUsers() {
  const sampleUsers = [
    { username: "quocviet69", password: "123456" },
    { username: "tranduythanh", password: "123456" },
    { username: "admin", password: "admin123" },
    { username: "student", password: "student123" },
  ];
  for (const user of sampleUsers) {
    await userCollection.updateOne(
      { username: user.username },
      { $setOnInsert: user },
      { upsert: true },
    );
  }
  console.log("Sample Users ensured in FashionData.User");
}
initSampleUsers();

// Tạo tài khoản admin mặc định nếu chưa có
async function initDefaultUser() {
  const existing = await logginCollection.findOne({ username: "quocviet69" });
  if (!existing) {
    await logginCollection.insertOne({
      username: "quocviet69",
      password: "123456",
      fullname: "Quoc Viet",
      email: "quocviet69@gmail.com",
      phone: "0123456789",
      role: "admin",
      createdAt: new Date(),
    });
    console.log("Default admin account created in Loggin collection.");
  }
}
initDefaultUser();

// GET distinct styles
app.get("/ex58-fashions/styles", cors(), async (req, res) => {
  try {
    const styles = await fashionCollection.distinct("fashion_style");
    res.json(styles.filter(Boolean).sort());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all fashions (sorted by creation_date desc, optional ?style= filter)
app.get("/ex58-fashions", cors(), async (req, res) => {
  try {
    const filter = {};
    if (req.query.style) filter.fashion_style = req.query.style;
    const result = await fashionCollection
      .find(filter)
      .sort({ creation_date: -1 })
      .toArray();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET one fashion by id
app.get("/ex58-fashions/:id", cors(), async (req, res) => {
  try {
    const result = await fashionCollection.findOne({
      _id: new ObjectId(req.params.id),
    });
    if (!result) return res.status(404).json({ error: "Not found" });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create new fashion
app.post("/ex58-fashions", cors(), async (req, res) => {
  try {
    const { fashion_title, fashion_details, thumbnail, fashion_style } =
      req.body;
    if (!fashion_title || !fashion_style)
      return res
        .status(400)
        .json({ error: "fashion_title and fashion_style are required" });
    const newFashion = {
      fashion_title,
      fashion_details: fashion_details || "",
      thumbnail: thumbnail || "",
      fashion_style,
      creation_date: new Date(),
    };
    const result = await fashionCollection.insertOne(newFashion);
    res
      .status(201)
      .json({ message: "Created successfully", insertedId: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update fashion by id
app.put("/ex58-fashions/:id", cors(), async (req, res) => {
  try {
    const { fashion_title, fashion_details, thumbnail, fashion_style } =
      req.body;
    const result = await fashionCollection.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { fashion_title, fashion_details, thumbnail, fashion_style } },
    );
    if (result.matchedCount === 0)
      return res.status(404).json({ error: "Not found" });
    res.json({ message: "Updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE fashion by id
app.delete("/ex58-fashions/:id", cors(), async (req, res) => {
  try {
    const result = await fashionCollection.deleteOne({
      _id: new ObjectId(req.params.id),
    });
    if (result.deletedCount === 0)
      return res.status(404).json({ error: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /auth/login - Đăng nhập, lưu Cookie
app.post(
  "/auth/login",
  cors({ origin: true, credentials: true }),
  async (req, res) => {
    try {
      if (!req.body)
        return res.status(400).json({ success: false, message: "Body rỗng" });
      const { username, password } = req.body;
      if (!username || !password)
        return res
          .status(400)
          .json({ success: false, message: "Thiếu username hoặc password" });
      const user = await userCollection.findOne({ username, password });
      if (user) {
        // Lưu thông tin đăng nhập vào Cookie (maxAge: 7 ngày)
        res.cookie("username", username, {
          maxAge: 7 * 24 * 60 * 60 * 1000,
          httpOnly: false,
        });
        res.cookie("password", password, {
          maxAge: 7 * 24 * 60 * 60 * 1000,
          httpOnly: false,
        });
        res.json({
          success: true,
          message: "Đăng nhập thành công",
          username: user.username,
        });
      } else {
        res.status(401).json({
          success: false,
          message: "Tài khoản hoặc mật khẩu không đúng",
        });
      }
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },
);

// GET /auth/users - Lấy danh sách user trong FashionData.User
app.get("/auth/users", cors(), async (req, res) => {
  try {
    const result = await userCollection
      .find({}, { projection: { password: 0 } })
      .toArray();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /auth/register - Đăng ký user mới vào FashionData.User
app.post("/auth/register", cors(), async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ error: "Thiếu username hoặc password" });
    const existing = await userCollection.findOne({ username });
    if (existing) return res.status(409).json({ error: "Username đã tồn tại" });
    const result = await userCollection.insertOne({ username, password });
    res
      .status(201)
      .json({ message: "Đăng ký thành công", insertedId: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /login - Đăng nhập
app.post("/login", cors(), async (req, res) => {
  try {
    if (!req.body)
      return res.status(400).json({ success: false, message: "Body rỗng" });
    const { username, password } = req.body;
    if (!username || !password)
      return res
        .status(400)
        .json({ success: false, message: "Thiếu username hoặc password" });
    const user = await logginCollection.findOne({ username, password });
    if (user) {
      res.json({
        success: true,
        message: "Đăng nhập thành công",
        role: user.role,
        fullname: user.fullname,
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Tài khoản hoặc mật khẩu không đúng",
      });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /register - Đăng ký tài khoản mới
app.post("/register", cors(), async (req, res) => {
  try {
    if (!req.body) return res.status(400).json({ error: "Body rỗng" });
    const { username, password, fullname, email, phone, role } = req.body;
    if (!username || !password)
      return res.status(400).json({ error: "Thiếu username hoặc password" });
    const existing = await logginCollection.findOne({ username });
    if (existing) return res.status(409).json({ error: "Username đã tồn tại" });
    const result = await logginCollection.insertOne({
      username,
      password,
      fullname: fullname || "",
      email: email || "",
      phone: phone || "",
      role: role || "user",
      createdAt: new Date(),
    });
    res
      .status(201)
      .json({ message: "Đăng ký thành công", insertedId: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /loggin - Lấy danh sách tất cả user (ẩn password)
app.get("/loggin", cors(), async (req, res) => {
  try {
    const result = await logginCollection
      .find({}, { projection: { password: 0 } })
      .toArray();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /loggin/:username - Lấy thông tin 1 user
app.get("/loggin/:username", cors(), async (req, res) => {
  try {
    const user = await logginCollection.findOne(
      { username: req.params.username },
      { projection: { password: 0 } },
    );
    if (!user) return res.status(404).json({ error: "User không tồn tại" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /loggin/:username - Cập nhật thông tin user
app.put("/loggin/:username", cors(), async (req, res) => {
  try {
    if (!req.body) return res.status(400).json({ error: "Body rỗng" });
    const { password, fullname, email, phone, role } = req.body;
    const updateFields = {};
    if (password) updateFields.password = password;
    if (fullname) updateFields.fullname = fullname;
    if (email) updateFields.email = email;
    if (phone) updateFields.phone = phone;
    if (role) updateFields.role = role;
    const result = await logginCollection.updateOne(
      { username: req.params.username },
      { $set: updateFields },
    );
    if (result.matchedCount === 0)
      return res.status(404).json({ error: "User không tồn tại" });
    res.json({ message: "Cập nhật thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /loggin/:username - Xóa user
app.delete("/loggin/:username", cors(), async (req, res) => {
  try {
    const result = await logginCollection.deleteOne({
      username: req.params.username,
    });
    if (result.deletedCount === 0)
      return res.status(404).json({ error: "User không tồn tại" });
    res.json({ message: "Xóa user thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Thêm cookie-parser để xử lý cookie
var cookieParser = require("cookie-parser");
app.use(cookieParser());

app.get("/create-cookie", cors(), (req, res) => {
  res.cookie("username", "tranduythanh");
  res.cookie("password", "123456");
  account = { username: "tranduythanh", password: "123456" };
  res.cookie("account", account);
  res.send("cookies are created");
});
app.get("/read-cookie", cors(), (req, res) => {
  //cookie is stored in client, so we use req
  username = req.cookies.username;
  password = req.cookies.password;
  account = req.cookies.account;
  infor = "username = " + username + "<br/>";
  infor += "password = " + password + "<br/>";
  if (account != null) {
    infor += "account.username = " + account.username + "<br/>";
    infor += "account.password = " + account.password + "<br/>";
  }
  res.send(infor);
});
app.get("/create-limited-cookie", cors(), (req, res) => {
  //Expires after 360000 ms from the time it is set.
  res.cookie("infor_limit1", "I am limited Cookie - way 1", {
    expires: new Date(Date.now() + 360000),
  });
  res.cookie("infor_limit2", "I am limited Cookie - way 2", { maxAge: 360000 });
  res.send("Limited cookies are created");
});
app.get("/clear-cookie", cors(), (req, res) => {
  res.clearCookie("account");
  res.send("[account] Cookie is removed");
});

// ============================================================
// MOMO PAYMENT INTEGRATION (Sandbox - Test Environment)
// Sinh vien: Huynh Quoc Viet - K234111457
// Endpoint: https://test-payment.momo.vn/v2/gateway/api/create
// ============================================================
const crypto = require("crypto");
const https = require("https");

const MOMO_CONFIG = {
  partnerCode: "MOMO",
  accessKey: "F8BBA842ECF85",
  secretKey: "K951B6PE1waDMi640xX08PD3vg6EkVlz",
  hostname: "test-payment.momo.vn",
  path: "/v2/gateway/api/create",
  requestType: "payWithMethod",
  redirectUrl: "http://localhost:4200/momo-result",
  ipnUrl: "http://localhost:3002/momo/ipn",
};

// Tạo chữ ký HMAC SHA256
function createMomoSignature(rawSignature) {
  return crypto
    .createHmac("sha256", MOMO_CONFIG.secretKey)
    .update(rawSignature)
    .digest("hex");
}

// POST /momo/create-payment — Tạo yêu cầu thanh toán MoMo
app.post("/momo/create-payment", cors(), async (req, res) => {
  try {
    const { amount, orderInfo, orderId } = req.body;
    if (!amount || !orderInfo || !orderId) {
      return res
        .status(400)
        .json({ error: "Thiếu amount, orderInfo hoặc orderId" });
    }

    const requestId = MOMO_CONFIG.partnerCode + new Date().getTime();
    const extraData = "";

    // Tạo rawSignature ĐÚNG THỨ TỰ alphabetical
    const rawSignature =
      "accessKey=" +
      MOMO_CONFIG.accessKey +
      "&amount=" +
      amount +
      "&extraData=" +
      extraData +
      "&ipnUrl=" +
      MOMO_CONFIG.ipnUrl +
      "&orderId=" +
      orderId +
      "&orderInfo=" +
      orderInfo +
      "&partnerCode=" +
      MOMO_CONFIG.partnerCode +
      "&redirectUrl=" +
      MOMO_CONFIG.redirectUrl +
      "&requestId=" +
      requestId +
      "&requestType=" +
      MOMO_CONFIG.requestType;

    const signature = createMomoSignature(rawSignature);

    const requestBody = JSON.stringify({
      partnerCode: MOMO_CONFIG.partnerCode,
      partnerName: "MoMo Payment Test",
      storeId: "MomoTestStore",
      accessKey: MOMO_CONFIG.accessKey,
      requestId: requestId,
      amount: String(amount),
      orderId: orderId,
      orderInfo: orderInfo,
      redirectUrl: MOMO_CONFIG.redirectUrl,
      ipnUrl: MOMO_CONFIG.ipnUrl,
      extraData: extraData,
      requestType: MOMO_CONFIG.requestType,
      autoCapture: true,
      orderGroupId: "",
      signature: signature,
      lang: "vi",
    });

    console.log("[MoMo] rawSignature:", rawSignature);
    console.log("[MoMo] signature:", signature);
    console.log("[MoMo] requestBody:", requestBody);

    const options = {
      hostname: MOMO_CONFIG.hostname,
      port: 443,
      path: MOMO_CONFIG.path,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(requestBody),
      },
    };

    const momoReq = https.request(options, (momoRes) => {
      let data = "";
      momoRes.setEncoding("utf8");
      momoRes.on("data", (chunk) => {
        data += chunk;
      });
      momoRes.on("end", () => {
        console.log("[MoMo] Response:", data);
        const parsed = JSON.parse(data);
        res.json({
          resultCode: parsed.resultCode,
          message: parsed.message,
          payUrl: parsed.payUrl,
          orderId: parsed.orderId,
          requestId: parsed.requestId,
        });
      });
    });

    momoReq.on("error", (e) => {
      console.error("[MoMo] Request error:", e.message);
      res.status(500).json({ error: e.message });
    });

    momoReq.write(requestBody);
    momoReq.end();
  } catch (err) {
    console.error("[MoMo] Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// POST /momo/ipn — Nhận callback server-to-server từ MoMo (IPN)
app.post("/momo/ipn", cors(), (req, res) => {
  console.log("[MoMo IPN] Received callback:", req.body);
  const { orderId, resultCode, amount, message, signature } = req.body;
  console.log(
    `[MoMo IPN] orderId: ${orderId} | resultCode: ${resultCode} | amount: ${amount} | message: ${message}`,
  );
  // Trả 204 để MoMo biết đã nhận thành công
  res.status(204).send();
});

// GET /momo/return — Nhận query params sau khi redirect từ MoMo
app.get("/momo/return", cors(), (req, res) => {
  const { resultCode, orderId, amount, message, orderInfo } = req.query;
  console.log("[MoMo Return]", req.query);
  res.json({
    resultCode: Number(resultCode),
    orderId,
    amount,
    message,
    orderInfo,
    success: resultCode === "0",
  });
});
var session = require("express-session");
app.use(
  session({
    secret: "Shh, its a secret!",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 }, // 1 hour
  }),
);

app.get("/contact", cors(), (req, res) => {
  if (req.session.visited != null) {
    req.session.visited++;
    res.send("You visited this page " + req.session.visited + " times");
  } else {
    req.session.visited = 1;
    res.send("Welcome to this page for the first time!");
  }
});

// ============================================================
// EX63 - SHOPPING CART WITH SESSION
// ============================================================

// Product collection setup
const ex63Db = client.db("Ex63");
const productCollection = ex63Db.collection("Product");
const orderCollection = ex63Db.collection("Order");

// Seed sample products
async function initSampleProducts() {
  await productCollection.deleteMany({});
  await productCollection.insertMany([
    {
      name: "Áo Thun Nam Basic",
      price: 150000,
      category: "Áo",
      stock: 100,
      image: "assets/ex63/ao-thun.jpg",
      description: "Áo thun nam chất liệu cotton 100%, mềm mại, thoáng mát.",
    },
    {
      name: "Quần Jean Nam Slim Fit",
      price: 450000,
      category: "Quần",
      stock: 50,
      image: "assets/ex63/quan-jean.jpg",
      description: "Quần jean slim fit thời trang, co giãn tốt.",
    },
    {
      name: "Giày Sneaker Trắng",
      price: 850000,
      category: "Giày",
      stock: 30,
      image: "assets/ex63/sneaker-trang.jpg",
      description: "Giày sneaker trắng phong cách, đế êm, bền chắc.",
    },
    {
      name: "Túi Xách Nữ Da PU",
      price: 320000,
      category: "Phụ kiện",
      stock: 40,
      image: "assets/ex63/tui-xach.webp",
      description: "Túi xách nữ da PU cao cấp, nhiều ngăn tiện dụng.",
    },
    {
      name: "Áo Khoác Denim Unisex",
      price: 620000,
      category: "Áo",
      stock: 25,
      image: "assets/ex63/ao-khoac.jpg",
      description: "Áo khoác denim unisex phong cách Hàn Quốc.",
    },
    {
      name: "Mũ Lưỡi Trai Snapback",
      price: 180000,
      category: "Phụ kiện",
      stock: 60,
      image: "assets/ex63/non-luoi-trai.jpg",
      description: "Mũ lưỡi trai snapback thời trang, nhiều màu sắc.",
    },
  ]);
  console.log("Ex63: Sample products seeded.");
}
initSampleProducts();

// GET /ex63/products - Lấy tất cả sản phẩm
app.get("/ex63/products", async (req, res) => {
  try {
    const products = await productCollection.find({}).toArray();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /ex63/products/:id - Lấy 1 sản phẩm theo id
app.get("/ex63/products/:id", async (req, res) => {
  try {
    const product = await productCollection.findOne({
      _id: new ObjectId(req.params.id),
    });
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /ex63/cart - Lấy giỏ hàng từ Session
app.get("/ex63/cart", (req, res) => {
  const cart = req.session.cart || [];
  res.json({ cart, total: cart.reduce((s, i) => s + i.price * i.quantity, 0) });
});

// POST /ex63/cart/add - Thêm sản phẩm vào giỏ hàng (Session)
app.post("/ex63/cart/add", async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    if (!productId) return res.status(400).json({ error: "Thiếu productId" });

    const qty = parseInt(quantity) || 1;
    const product = await productCollection.findOne({
      _id: new ObjectId(productId),
    });
    if (!product) return res.status(404).json({ error: "Product not found" });

    if (!req.session.cart) req.session.cart = [];

    const idx = req.session.cart.findIndex(
      (item) => item.productId === productId,
    );
    if (idx >= 0) {
      req.session.cart[idx].quantity += qty;
    } else {
      req.session.cart.push({
        productId,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        quantity: qty,
      });
    }

    res.json({
      message: "Đã thêm vào giỏ hàng",
      cart: req.session.cart,
      total: req.session.cart.reduce((s, i) => s + i.price * i.quantity, 0),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /ex63/cart/update - Cập nhật số lượng sản phẩm trong giỏ
app.put("/ex63/cart/update", (req, res) => {
  const { productId, quantity } = req.body;
  if (!req.session.cart)
    return res.status(400).json({ error: "Giỏ hàng trống" });

  const idx = req.session.cart.findIndex((i) => i.productId === productId);
  if (idx < 0)
    return res.status(404).json({ error: "Sản phẩm không có trong giỏ" });

  const qty = parseInt(quantity);
  if (qty <= 0) {
    req.session.cart.splice(idx, 1);
  } else {
    req.session.cart[idx].quantity = qty;
  }

  res.json({
    message: "Đã cập nhật giỏ hàng",
    cart: req.session.cart,
    total: req.session.cart.reduce((s, i) => s + i.price * i.quantity, 0),
  });
});

// DELETE /ex63/cart/remove/:productId - Xóa 1 sản phẩm khỏi giỏ
app.delete("/ex63/cart/remove/:productId", (req, res) => {
  if (!req.session.cart) return res.json({ cart: [], total: 0 });
  req.session.cart = req.session.cart.filter(
    (i) => i.productId !== req.params.productId,
  );
  res.json({
    message: "Đã xóa khỏi giỏ hàng",
    cart: req.session.cart,
    total: req.session.cart.reduce((s, i) => s + i.price * i.quantity, 0),
  });
});

// DELETE /ex63/cart/clear - Xóa toàn bộ giỏ hàng
app.delete("/ex63/cart/clear", (req, res) => {
  req.session.cart = [];
  res.json({ message: "Đã xóa toàn bộ giỏ hàng", cart: [], total: 0 });
});

// POST /ex63/cart/checkout - Thanh toán / Lưu đơn hàng vào DB
app.post("/ex63/cart/checkout", async (req, res) => {
  try {
    const cart = req.session.cart;
    if (!cart || cart.length === 0)
      return res.status(400).json({ error: "Giỏ hàng trống" });

    const { customerName, customerPhone, customerAddress } = req.body;
    const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);

    const order = {
      customerName: customerName || "Khách lẻ",
      customerPhone: customerPhone || "",
      customerAddress: customerAddress || "",
      items: [...cart],
      total,
      status: "pending",
      createdAt: new Date(),
    };

    const result = await orderCollection.insertOne(order);
    req.session.cart = []; // Xóa giỏ hàng sau khi đặt hàng thành công

    res.status(201).json({
      message: "Đặt hàng thành công! Đơn hàng đã được lưu vào database.",
      orderId: result.insertedId,
      total,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
