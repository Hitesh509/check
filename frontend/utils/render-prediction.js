import { addToCart } from "@/lib/features/cart/cartSlice";
import { Scissors } from "lucide-react";

const ITEM_MAPPING = {
  apple: "prod_1",
  banana: "prod_2",
  bottle: "prod_3",
  book: "prod_4",
  // ❌ removed person mapping
};

// Track products already added & cooldown timers
const detectedItems = new Set();
const cooldownTimers = {};
const COOLDOWN_TIME = 3000; // 3 seconds cooldown per product

// 🔊 Beep sound function
function playBeep() {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(800, audioCtx.currentTime);
  gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);

  oscillator.start();
  oscillator.stop(audioCtx.currentTime + 0.2);
}

export function renderPredictions(predictions, ctx, dispatch) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  const font = "16px sans-serif";
  ctx.font = font;
  ctx.textBaseline = "top";

  const detectedInFrame = new Set();

  predictions.forEach((prediction) => {
    const [x, y, width, height] = prediction.bbox;
    const className = prediction.class;
    const productId = ITEM_MAPPING[className];

    // ✅ Only add valid mapped products
    if (productId) {
      detectedInFrame.add(productId);
    }

    // 🎯 Draw bounding box
    ctx.strokeStyle = productId ? "#FF0000" : "#00FFFF";
    ctx.lineWidth = 4;
    ctx.strokeRect(x, y, width, height);

    // Label background
    ctx.fillStyle = productId ? "#FF0000" : "#00FFFF";
    const textWidth = ctx.measureText(className).width;
    const textHeight = parseInt(font, 10);
    ctx.fillRect(x, y, textWidth + 4, textHeight + 4);

    // Label text
    ctx.fillStyle = "#000000";
    ctx.fillText(className, x, y);
  });

  // 🛒 Add detected products
  detectedInFrame.forEach((productId) => {
    if (!detectedItems.has(productId) && typeof dispatch === "function") {
      dispatch(addToCart({ productId }));
      detectedItems.add(productId);

      console.log(`✅ Product '${productId}' added to cart!`);

      // 🔊 Beep
      playBeep();

      // Cooldown
      if (cooldownTimers[productId]) clearTimeout(cooldownTimers[productId]);
      cooldownTimers[productId] = setTimeout(() => {
        detectedItems.delete(productId);
        console.log(`⏱ Product '${productId}' ready again.`);
      }, COOLDOWN_TIME);
    }
  });
}