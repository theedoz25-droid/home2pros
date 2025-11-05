// js/utils.js
const STORAGE_KEY = 'home2pros_jobs';

export const saveJobs = jobs => localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
export const loadJobs = () => JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

export const compressImage = (file, cb) => {
  const img = new Image();
  const reader = new FileReader();
  reader.onload = e => {
    img.src = e.target.result;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      let w = img.width, h = img.height;
      if (w > 800) { h = (800 / w) * h; w = 800; }
      canvas.width = w; canvas.height = h;
      ctx.drawImage(img, 0, 0, w, h);
      canvas.toBlob(cb, 'image/jpeg', 0.6);
    };
  };
  reader.readAsDataURL(file);
};