import img1 from "@assets/a-X_Website-2_1779440815736.png";
import img2 from "@assets/a-X_Website-6_1780065568271.png";
import img3 from "@assets/a-X_Website-8_1780065568271.png";
import img4 from "@assets/IMG_5721_1780065776415.jpeg";
import img5 from "@assets/IMG_5732_1780065776415.jpeg";
import img6 from "@assets/IMG_5733_1779460910871.jpeg";
import img7 from "@assets/IMG_5770_1780065776415.jpeg";
import img8 from "@assets/IMG_5794_1780065776415.jpeg";
import img9 from "@assets/IMG_5814_1780065776415.jpeg";
import img10 from "@assets/IMG_5838_1780065776415.jpeg";
import img11 from "@assets/IMG_5968_1780065776415.jpeg";
import img12 from "@assets/Image-35_1779439514931.png";
import img13 from "@assets/Image-36_1779442602408.png";
import img14 from "@assets/Image-37_1779471493810.png";
import img15 from "@assets/Image-38_1779472029402.png";
import img16 from "@assets/Image-39_1779472248528.png";
import img17 from "@assets/Image-40_1780078098554.png";
import img18 from "@assets/Image-41_1780085774791.png";
import img19 from "@assets/Image-44_1780094872119.png";
import img20 from "@assets/Image-45_1780095437884.png";
import img21 from "@assets/morocco-route-map.png";

const images = [
  { src: img1,  label: "a-X_Website-2" },
  { src: img2,  label: "a-X_Website-6" },
  { src: img3,  label: "a-X_Website-8" },
  { src: img4,  label: "IMG_5721" },
  { src: img5,  label: "IMG_5732" },
  { src: img6,  label: "IMG_5733" },
  { src: img7,  label: "IMG_5770" },
  { src: img8,  label: "IMG_5794" },
  { src: img9,  label: "IMG_5814" },
  { src: img10, label: "IMG_5838" },
  { src: img11, label: "IMG_5968" },
  { src: img12, label: "Image-35" },
  { src: img13, label: "Image-36" },
  { src: img14, label: "Image-37" },
  { src: img15, label: "Image-38" },
  { src: img16, label: "Image-39" },
  { src: img17, label: "Image-40" },
  { src: img18, label: "Image-41" },
  { src: img19, label: "Image-44" },
  { src: img20, label: "Image-45" },
  { src: img21, label: "morocco-route-map (old)" },
];

export default function Gallery() {
  return (
    <div className="min-h-screen bg-black p-6 text-white">
      <p className="text-white/50 text-xs uppercase tracking-widest mb-6">Unused images — temporary reference page</p>
      <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
        {images.map(({ src, label }) => (
          <div key={label} className="break-inside-avoid">
            <img src={src} alt={label} className="w-full rounded object-cover" />
            <p className="text-white/40 text-[10px] mt-1 truncate">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
