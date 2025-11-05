// js/contractor.js
import { loadJobs, saveJobs } from './utils.js';

export const initProDashboard = () => {
  const list = document.getElementById('jobList');
  if (!list) return;

  const render = () => {
    const jobs = loadJobs();
    list.innerHTML = jobs.length
      ? jobs.map(job => `
          <div class="job-card">
            <div class="job-title">${job.title}</div>
            <div class="job-meta"><strong>${job.trade}</strong> • ZIP: ${job.zip} • ${job.bids?.length||0} bids</div>
            <div class="job-desc">${job.description}</div>
            ${job.images?.length ? `<div class="photo-grid">${job.images.map(img => `<img src="${img}" onclick="openPhoto('${img}')">`).join('')}</div>` : ''}
            <div class="bid-form">
              <input type="number" class="bid-input" placeholder="Bid ($)" id="bid-${job.id}">
              <button class="btn-bid" onclick="bid('${job.id}')">Bid</button>
              <button class="btn-ask" onclick="ask('${job.id}')">Ask</button>
            </div>
          </div>`).join('')
      : '<p style="text-align:center;color:#666;padding:3rem">No active jobs.</p>';
  };

  window.bid = id => {
    const amt = document.getElementById(`bid-${id}`).value;
    if (!amt) return alert('Enter amount');
    const jobs = loadJobs().map(j => j.id === id ? {
      ...j, bids: [...(j.bids||[]), { id: Date.now()+'', name: 'Pro LLC', amount: +amt, message: 'Available now' }]
    } : j);
    saveJobs(jobs);
    render();
  };

  window.ask = id => {
    const q = prompt('Ask customer:');
    if (q) {
      const jobs = loadJobs().map(j => j.id === id ? {
        ...j, qa: [...(j.qa||[]), { question: q, from: 'Pro LLC', answer: '' }]
      } : j);
      saveJobs(jobs);
    }
  };

  render();
};

window.openPhoto = src => {
  const modal = document.createElement('div');
  modal.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.9);display:flex;align-items:center;justify-content:center;z-index:9999;padding:2rem;';
  modal.innerHTML = `<img src="${src}" style="max-width:90%;max-height:90%;border-radius:12px;"><button onclick="this.parentElement.remove()" style="position:absolute;top:20px;right:20px;background:white;color:black;padding:8px 16px;border:none;border-radius:8px;">Close</button>`;
  document.body.appendChild(modal);
};