// js/customer.js — JOB LISTING + DASHBOARD LOGIC
import { saveJobs, loadJobs } from './utils.js';

export const initDashboard = () => {
  const list = document.getElementById('jobsList');
  if (!list) return;

  const renderJob = job => {
    const hasBid = job.bids?.some(b => b.accepted);
    return `
      <div class="job-card ${localStorage.getItem(\`job_\${job.id}_open\`) === 'true' ? 'expanded' : ''}" id="job-${job.id}">
        <div class="job-header" onclick="toggleJob('${job.id}')">
          <div><div class="job-title">${job.title}</div>
          <p style="margin:0.25rem 0;color:#555"><strong>${job.trade}</strong> • ZIP: ${job.zip}</p>
          <p style="font-size:0.9rem;color:#6b7280">${job.bids?.length||0} bids • ${job.qa?.length||0} questions</p></div>
          <span class="toggle-text">${localStorage.getItem(\`job_\${job.id}_open\`) === 'true' ? 'Hide' : 'View'} Details</span>
        </div>
        <div class="job-details">
          <p style="line-height:1.7;color:#374151;margin-bottom:1.5rem">${job.description}</p>
          ${job.images?.length ? `<div style="margin:1.5rem 0"><strong style="color:#1e40af">Photos (${job.images.length})</strong>
            <div class="image-grid">${job.images.map(img => `<img src="${img}" onclick="openPhoto('${img}')">`).join('')}</div></div>` : ''}
          <div style="margin-bottom:1.5rem"><span class="status-badge status-${job.status}">${job.status[0].toUpperCase() + job.status.slice(1)}</span></div>

          <!-- EDIT BUTTON -->
          <div style="margin-bottom:1rem;">
            <button class="action-btn btn-edit" onclick="editJob('${job.id}')">Edit Job</button>
          </div>

          <!-- BIDS & Q&A -->
          <h3 style="font-size:1.2rem;font-weight:800;color:#1e40af;margin:1.5rem 0 0.75rem">Bids</h3>
          ${job.bids?.length ? job.bids.map(b => `
            <div class="bid-item"><div style="display:flex;justify-content:space-between;align-items:center">
              <div><div class="bid-amount">$${b.amount}</div><p style="margin:0.25rem 0"><strong>${b.name}</strong></p>
              <p style="font-size:0.9rem;color:#6b7280">${b.message}</p></div>
              ${!b.accepted && job.status !== 'progress' && job.status !== 'completed' ? 
                `<button class="btn" style="padding:8px 16px" onclick="acceptBid('${job.id}','${b.id}')">Accept</button>` 
                : '<span style="color:#16a34a;font-weight:bold">Accepted</span>'}
            </div></div>`).join('') : '<p style="color:#6b7280;font-style:italic">No bids yet.</p>'}

          <h3 style="font-size:1.2rem;font-weight:800;color:#1e40af;margin:1.5rem 0 0.75rem">Q&A</h3>
          ${job.qa?.length ? job.qa.map((q,i) => `
            <div class="qa-item"><p class="qa-question">Q: ${q.question} <em style="color:#6b7280">— ${q.from}</em></p>
            ${q.answer ? `<p class="qa-answer">A: ${q.answer}</p>` : 
              `<p class="click-to-answer" onclick="answerQ('${job.id}',${i})">Click to answer</p>`}
            </div>`).join('') : '<p style="color:#6b7280;font-style:italic">No questions yet.</p>'}

          <div style="margin-top:1.5rem;text-align:center">
            ${job.status === 'open' && !hasBid ? `<button class="action-btn btn-cancel" onclick="cancelJob('${job.id}')">Cancel</button>` : ''}
          </div>
        </div>
      </div>`;
  };

  const render = () => {
    const jobs = loadJobs();
    list.innerHTML = jobs.length ? jobs.map(renderJob).join('') : '<p style="text-align:center;color:#666;padding:3rem">No jobs yet.</p>';
  };

  window.toggleJob = id => {
    const open = localStorage.getItem(`job_${id}_open`) !== 'true';
    localStorage.setItem(`job_${id}_open`, open);
    render();
  };

  window.editJob = id => {
    const job = loadJobs().find(j => j.id === id);
    if (!job) return;

    const newTitle = prompt('Edit Title:', job.title);
    if (newTitle === null) return;
    const newDesc = prompt('Edit Description:', job.description);
    if (newDesc === null) return;

    const updated = { ...job, title: newTitle, description: newDesc };
    saveJobs(loadJobs().map(j => j.id === id ? updated : j));
    alert('Job updated!');
    render();
  };

  window.acceptBid = (jobId, bidId) => {
    const jobs = loadJobs().map(j => j.id === jobId ? {
      ...j, bids: j.bids.map(b => b.id === bidId ? { ...b, accepted: true } : b)
    } : j);
    saveJobs(jobs);
    render();
  };

  window.cancelJob = id => confirm('Cancel job?') && saveJobs(loadJobs().filter(j => j.id !== id)) && render();

  window.openPhoto = src => {
    const modal = document.createElement('div');
    modal.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.9);display:flex;align-items:center;justify-content:center;z-index:9999;padding:2rem;';
    modal.innerHTML = `<img src="${src}" style="max-width:90%;max-height:90%;border-radius:12px;"><button onclick="this.parentElement.remove()" style="position:absolute;top:20px;right:20px;background:white;color:black;padding:8px 16px;border:none;border-radius:8px;">Close</button>`;
    document.body.appendChild(modal);
  };

  render();
};