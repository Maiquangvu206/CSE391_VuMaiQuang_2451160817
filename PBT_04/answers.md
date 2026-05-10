### Câu A1 (10đ) — 5 Loại Positioning
| Position | Vẫn chiếm chỗ trong flow? | Tham chiếu vị trí | Cuộn theo trang? | Use case |
|----------|---------------------------|-------------------|------------------|----------|
| `static` | Có | Flow bình thường | Có | Mặc định; nội dung bình thường trong flow |
| `relative` | Có | Vị trí gốc của chính nó | Có | Dịch nhẹ phần tử; làm điểm tọa độ cho con |
| `absolute` | Không | Bám vào cha RELATIVE gần nhất | Có | Badge, dropdown, tooltip, overlay (phần tử nằm chồng, không chiếm chỗ) |
| `fixed` | Không | Cửa sổ trình duyệt | Có | Chat button, cookie banner, modal cố định |
| `sticky` | Có | dính khi scroll đến ngưỡng | Ban đầu cuộn; khi đạt ngưỡng thì dính | Sticky header, table header, sidebar dính khi scroll |

- Khi nào absolute tham chiếu body? Khi không có bất kỳ ancestor nào có position khác static (tức mọi cha đều mặc định position: static), trình duyệt sẽ dùng khối chứa ban đầu (root — thường là html/body) làm tham chiếu.
- Khi nào absolute tham chiếu parent? Khi có một ancestor (không nhất thiết là cha trực tiếp) mà có position = relative | absolute | fixed | sticky; absolute sẽ lấy ancestor gần nhất trong số đó làm tham chiếu.
- "Nearest positioned ancestor" nghĩa là: ancestor gần nhất trên cây DOM có giá trị position khác static — đó là gốc tọa độ (containing block) để tính top/right/bottom/left cho phần tử position: absolute (hoặc cho position: fixed/sticky trong các ngữ cảnh tương ứng).

### Câu A2 (10đ) — Flexbox vs Grid
/* Trường hợp 1 */
.container { display: flex; }
.item { flex: 1; }
/* 1 hàng, 4 cột ngang, mỗi item chia đều chiều ngang.
4 items → Bố cục = [ item1 ] [ item2 ] [ item3 ] [ item4 ] */

/* Trường hợp 2 */
.container { display: flex; flex-wrap: wrap; }
.item { width: 45%; margin: 2.5%; }
/* Hai cột mỗi hàng (45% + margins ≈ 50% mỗi item), nên 6 items → 3 hàng × 2 cột.
6 items → Bố cục = 
Row1: [ item1 ] [ item2 ]
Row2: [ item3 ] [ item4 ]
Row3: [ item5 ] [ item6 ] */

/* Trường hợp 3 */
.container { display: flex; justify-content: space-between; align-items: center; }
/* 1 hàng; item1 dàn trái, item3 dàn phải, item2 ở giữa (khoảng rỗng giữa đều); tất cả căn giữa theo chiều dọc.
3 items → Bố cục = [ item1 ]──────────[ item2 ]──────────[ item3 ] */

/* Trường hợp 4 */
.container { display: grid; grid-template-columns: 200px 1fr 200px; gap: 20px; }
/* 1 hàng, 3 vùng cột: trái 200px, giữa linh hoạt, phải 200px; mỗi item vào một cột tương ứng
3 items → Bố cục = | [Sidebar 200px] | [Main 1fr] | [Ads 200px] | */

/* Trường hợp 5 */
.container { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
/* Lưới 3 cột, điền theo hàng trái→phải, top→down. 7 items → ceil(7/3)=3 hàng. Hàng 1: items 1-3; hàng 2: 4-6; hàng 3: item7 ở cột 1, cột 2-3 trống.
7 items → Bố cục = Row1: [1] [2] [3]
Row2: [4] [5] [6]
Row3: [7] [ ] [ ] */