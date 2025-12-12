// // === Inject Modal HTML ke halaman ===
// const modalHTML = `
//   <div id="bookingModal" style="
//     display:none; position:fixed; top:0; left:0; width:100%; height:100%;
//     background:rgba(0,0,0,0.6); justify-content:center; align-items:center;
//     z-index:9999;
//   ">
//     <div class="modal-content" style="
//       background:#fff; border-radius:10px; width:90%; max-width:800px; height: 90%;
//       padding:20px; position:relative; box-shadow:0 5px 20px rgba(0,0,0,0.2);
//       display:flex; flex-direction:column;
//     ">
//       <button id="closeModal" style="
//         position:absolute; top:10px; right:10px; background:#dc3545; color:#fff;
//         border:none; border-radius:50%; width:30px; height:30px; font-weight:bold;
//         cursor:pointer;
//       ">×</button>

//       <iframe 
//         class="booking-frame"
//         src="https://api.leadconnectorhq.com/widget/booking/HjthQ1ZjNLaxQOuZEa2w" 
//         style="flex:1; width:100%; height:100%; border:none;  overflow:hidden;"
//         id="HjthQ1ZjNLaxQOuZEa2w_1760998680333"></iframe><br>

//       <script src="https://api.leadconnectorhq.com/js/form_embed.js" type="text/javascript"></script>
//     </div>
//   </div>
// `;
  
// document.body.insertAdjacentHTML("beforeend", modalHTML);

// // === Tambahkan Event Listener ===
// const buttons = document.querySelectorAll(".btn-get-started");
// const modal = document.getElementById("bookingModal");

// if (buttons.length > 0 && modal) {
//   buttons.forEach((btn) => {
//     btn.addEventListener("click", () => {
//       modal.style.display = "flex";
//     });
//   });

//   // Tutup modal
//   const closeModal = document.getElementById("closeModal");
//   closeModal.addEventListener("click", () => {
//     modal.style.display = "none";
//   });

//   // Klik di luar modal => tutup
//   modal.addEventListener("click", (e) => {
//     if (e.target === modal) modal.style.display = "none";
//   });
// }
