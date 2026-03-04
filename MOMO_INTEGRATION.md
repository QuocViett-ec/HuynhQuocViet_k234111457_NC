# Tích Hợp MoMo Payment - Outline Triển Khai

**Sinh viên:** Huỳnh Quốc Việt - K234111457  
**Môi trường:** Sandbox (Test) — `https://test-payment.momo.vn`  
**Phương thức:** `captureWallet` — `POST /v2/gateway/api/create`

---

## Thông Tin Sandbox Credentials

| Tham số       | Giá trị                                              |
| ------------- | ---------------------------------------------------- |
| `partnerCode` | `MOMO`                                               |
| `accessKey`   | `F8BBA842ECF85`                                      |
| `secretKey`   | `K951B6PE1waDMi640xX08PD3vg6EkVlz`                   |
| `endpoint`    | `https://test-payment.momo.vn/v2/gateway/api/create` |
| `requestType` | `captureWallet`                                      |

---

## Luồng Thanh Toán

```
[Angular /momo]
    --> POST /momo/create-payment (my-server-mongodb:3002)
        --> POST https://test-payment.momo.vn/v2/gateway/api/create
            <-- { payUrl }
        <-- { payUrl }
    --> window.location.href = payUrl (redirect sang MoMo)
        --> MoMo xử lý thanh toán
            --> GET redirectUrl (/momo/return) [hiện thị kết quả cho user]
            --> POST ipnUrl (/momo/ipn) [server-to-server callback]
```

---

## Các Bước Triển Khai (Theo Thứ Tự)

### Bước 1 — Backend: Thêm endpoint `/momo/create-payment` vào `my-server-mongodb/Index.js`

- [ ] Import `crypto` và `https`
- [ ] Tạo hàm `createMomoSignature(data)` dùng HMAC SHA256
- [ ] `POST /momo/create-payment`: nhận `amount`, `orderInfo`, `orderId` từ body
- [ ] Build `rawSignature` đúng thứ tự alphabetical
- [ ] Gọi HTTPS tới `test-payment.momo.vn/v2/gateway/api/create`
- [ ] Trả về `{ payUrl, orderId, resultCode, message }` cho Angular

### Bước 2 — Backend: Thêm endpoint `/momo/ipn` (IPN Callback)

- [ ] `POST /momo/ipn`: nhận callback server-to-server từ MoMo
- [ ] Log toàn bộ dữ liệu nhận được
- [ ] Xác minh `signature` từ MoMo (optional ở môi trường test)
- [ ] Trả về HTTP 204 (No Content) để MoMo biết đã nhận

### Bước 3 — Backend: Thêm endpoint `/momo/return` (Redirect sau thanh toán)

- [ ] `GET /momo/return`: nhận query params từ MoMo sau khi redirect
- [ ] Parse `resultCode`, `orderId`, `amount`, `message`
- [ ] Trả về JSON kết quả (Angular dùng redirectUrl nội bộ để hiển thị)

### Bước 4 — Angular: Cập nhật `proxy.conf.json`

- [ ] Thêm proxy route `/momo` → `http://localhost:3002`
- [ ] Đảm bảo POST body được forward đúng

### Bước 5 — Angular: Tạo `MomoService` (`my-service/momo-service.ts`)

- [ ] `createPayment(amount, orderInfo, orderId)` → `Observable<any>`
- [ ] Gọi `POST /momo/create-payment`
- [ ] Xử lý lỗi với `catchError`

### Bước 6 — Angular: Tạo component `momo-payment`

- [ ] Tạo `momo-payment.ts`: form nhập số tiền + nút thanh toán
- [ ] Tạo `momo-payment.html`: UI thanh toán
- [ ] Tạo `momo-payment.css`: style cơ bản
- [ ] Khi submit → gọi `MomoService.createPayment()` → nhận `payUrl` → redirect

### Bước 7 — Angular: Đăng ký component vào `app-module.ts`

- [ ] Import `MomoPayment` component
- [ ] Thêm vào `declarations: []`

### Bước 8 — Angular: Thêm route vào `app-routing-module.ts`

- [ ] Import `MomoPayment`
- [ ] Thêm `{ path: 'momo', component: MomoPayment }`

### Bước 9 — Angular: Cập nhật nav link trong `ex37.html`

- [ ] Đổi `<a href="#">MoMo Payment</a>` → `<a routerLink="/momo">MoMo Payment</a>`

### Bước 10 — Kiểm thử (SIT)

- [ ] Chạy `my-server-mongodb` (port 3002): `npm start`
- [ ] Chạy `my-app`: `ng serve`
- [ ] Truy cập `http://localhost:4200` → click **MoMo Payment**
- [ ] Nhập số tiền → click **Thanh toán**
- [ ] Được redirect sang trang sandbox MoMo
- [ ] Dùng thông tin thẻ test để hoàn tất giao dịch
- [ ] Kiểm tra callback log trên server

---

## Thông Tin Thẻ Test MoMo Sandbox

| Loại           | Số thẻ                | Kết quả               |
| -------------- | --------------------- | --------------------- |
| Thẻ thành công | `9704 0500 0000 0018` | Thanh toán thành công |
| Không đủ số dư | `9704 0500 0000 0100` | Lỗi số dư             |
| Thẻ bị khóa    | `9704 0500 0000 0068` | Thẻ bị khóa           |

**OTP mặc định:** `0000` hoặc `000000`

---

## Cấu Trúc File Sẽ Tạo/Sửa

```
my-server-mongodb/
  Index.js                        ← Thêm 3 endpoint MoMo (Bước 1-3)

my-app/
  proxy.conf.json                 ← Thêm proxy /momo (Bước 4)
  src/app/
    my-service/
      momo-service.ts             ← Tạo mới (Bước 5)
    momo-payment/
      momo-payment.ts             ← Tạo mới (Bước 6)
      momo-payment.html           ← Tạo mới (Bước 6)
      momo-payment.css            ← Tạo mới (Bước 6)
    app-module.ts                 ← Thêm import + declare (Bước 7)
    app-routing-module.ts         ← Thêm route /momo (Bước 8)
    ex37.html                     ← Cập nhật nav link (Bước 9)
```
