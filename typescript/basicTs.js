var Car = /** @class */ (function () {
    function Car(brand, model, year) {
        this.brand = brand;
        this.model = model;
        this.year = year;
    }
    Car.prototype.displayInfo = function () {
        console.log("Brand: ".concat(this.brand, ", Model: ").concat(this.model, ", Year: ").concat(this.year));
    };
    return Car;
}());
var myCar = new Car("Toyota", "Corolla", 2020);
myCar.displayInfo();
// ✨ Manfaat Menggunakan TypeScript Dibandingkan JavaScript dalam Aplikasi Skala Besar:
// Fitur TypeScript	                                                        Manfaat di Proyek Besar
// ✅ Static Typing	                                Menangkap kesalahan sebelum runtime saat compile, sehingga lebih aman.
// ✅ IntelliSense & Auto-complete	                Editor (seperti VSCode) bisa bantu developer dengan saran kode otomatis.
// ✅ OOP Support (class, interface, inheritance)	Memudahkan organisasi kode yang kompleks dan scalable.
// ✅ Better Refactoring	                            Bisa mengubah nama variabel/function/class dengan aman di seluruh project.
// ✅ Compatibility	                                TypeScript dikompilasi menjadi JavaScript, jadi tetap bisa jalan di browser atau Node.js.
// ✅ Code Readability & Maintainability	            Lebih mudah dipahami dan dipelihara oleh tim besar, terutama saat onboarding.
