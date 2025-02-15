// channel.js
document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("No user logged in");
      window.location.href = "Webpage.html";
      return;
    }
  
    const channelNameEl = document.getElementById("channelName");
    const assignedUserEl = document.getElementById("assignedUser");
  
    assignedUserEl.textContent = user.name;
    
    // e.g. display the first assigned channel
    channelNameEl.textContent =
      user.channels && user.channels.length > 0
      ? user.channels[0]
      : "No channel assigned";
  });
  