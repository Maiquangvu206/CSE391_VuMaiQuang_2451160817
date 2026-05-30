
const students = [
    { name: "An", math: 8, physics: 7, cs: 9, gender: "M" },
    { name: "Bình", math: 6, physics: 9, cs: 7, gender: "F" },
    { name: "Chi", math: 9, physics: 6, cs: 8, gender: "F" },
    { name: "Dũng", math: 5, physics: 5, cs: 6, gender: "M" },
    { name: "Em", math: 10, physics: 8, cs: 9, gender: "F" },
    { name: "Phong", math: 3, physics: 4, cs: 5, gender: "M" },
    { name: "Giang", math: 7, physics: 7, cs: 7, gender: "F" },
    { name: "Huy", math: 4, physics: 6, cs: 3, gender: "M" },
];

// Hàm làm tròn 1 chữ số thập phân
function round1(n) {
    return Math.round(n * 10) / 10;
}

// Xếp loại theo điểm TB
function classify(avg) {
    if (avg >= 8.0) return "Giỏi";
    else if (avg >= 6.5) return "Khá";
    else if (avg >= 5.0) return "Trung bình";
    else return "Yếu";
}

// Tính TB theo công thức
function calcAverage(student) {
    return student.math * 0.4 + student.physics * 0.3 + student.cs * 0.3;
}

// Cấu trúc lưu kết quả
let results = [];
let countGioi = 0;
let countKha = 0;
let countTrungBinh = 0;
let countYeu = 0;

let maxStudent = null;
let minStudent = null;

// Tính tổng để lấy TB từng môn
let sumMath = 0;
let sumPhysics = 0;
let sumCs = 0;

// Bonus: tính TB theo giới tính
let sumMale = 0, countMale = 0;
let sumFemale = 0, countFemale = 0;

// Duyệt danh sách sinh viên
for (let i = 0; i < students.length; i++) {
    const s = students[i];
    const avg = calcAverage(s);
    const avgRounded = round1(avg);
    const rank = classify(avg);

    // Lưu kết quả
    results.push({
        stt: i + 1,
        name: s.name,
        avg: avgRounded,
        rank: rank
    });

    // Đếm xếp loại
    if (rank === "Giỏi") countGioi++;
    else if (rank === "Khá") countKha++;
    else if (rank === "Trung bình") countTrungBinh++;
    else countYeu++;

    // Tìm cao nhất / thấp nhất
    if (maxStudent === null || avg > maxStudent.avg) {
        maxStudent = {
            name: s.name,
            avg: avgRounded,
            rank: rank
        };
    }

    if (minStudent === null || avg < minStudent.avg) {
        minStudent = {
            name: s.name,
            avg: avgRounded,
            rank: rank
        };
    }

    // Cộng điểm từng môn
    sumMath += s.math;
    sumPhysics += s.physics;
    sumCs += s.cs;

    // Bonus theo giới tính
    if (s.gender === "M") {
        sumMale += avg;
        countMale++;
    } else if (s.gender === "F") {
        sumFemale += avg;
        countFemale++;
    }
}

// Tính TB từng môn
let avgMath = round1(sumMath / students.length);
let avgPhysics = round1(sumPhysics / students.length);
let avgCs = round1(sumCs / students.length);

// Tính TB theo giới tính
let avgMale = countMale > 0 ? round1(sumMale / countMale) : 0;
let avgFemale = countFemale > 0 ? round1(sumFemale / countFemale) : 0;

// In bảng kết quả
console.log("| STT | Tên    | TB   | Xếp loại    |");
console.log("|-----|--------|------|-------------|");

for (let i = 0; i < results.length; i++) {
    const r = results[i];

    let sttStr = String(r.stt).padEnd(3, " ");
    let nameStr = r.name.padEnd(6, " ");
    let avgStr = r.avg.toFixed(1).padEnd(4, " ");
    let rankStr = r.rank.padEnd(11, " ");

    console.log(`| ${sttStr} | ${nameStr} | ${avgStr} | ${rankStr} |`);
}

// In thống kê xếp loại
console.log("\n--- Thống kê xếp loại ---");
console.log("Giỏi:", countGioi);
console.log("Khá:", countKha);
console.log("Trung bình:", countTrungBinh);
console.log("Yếu:", countYeu);

// In sinh viên cao nhất / thấp nhất
console.log("\n--- Điểm TB cao nhất / thấp nhất ---");
console.log("Cao nhất:", maxStudent.name, "-", maxStudent.avg.toFixed(1), "-", maxStudent.rank);
console.log("Thấp nhất:", minStudent.name, "-", minStudent.avg.toFixed(1), "-", minStudent.rank);

// In TB từng môn
console.log("\n--- Điểm TB toàn lớp cho từng môn ---");
console.log("Toán:", avgMath.toFixed(1));
console.log("Lý:", avgPhysics.toFixed(1));
console.log("Tin:", avgCs.toFixed(1));

// Bonus: TB theo giới tính
console.log("\n--- Điểm TB theo giới tính ---");
console.log("Nam:", avgMale.toFixed(1));
console.log("Nữ:", avgFemale.toFixed(1));