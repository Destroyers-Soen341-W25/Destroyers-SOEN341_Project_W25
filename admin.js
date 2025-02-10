let channels = ['General', 'Support'];
let users = [
    { username: 'user', role: 'user', channels: ['General'] },
    { username: 'admin', role: 'admin', channels: ['General', 'Support'] }
];

document.addEventListener('DOMContentLoaded', function () {
    renderChannels();
    renderChannelSelects();
});

document.getElementById('create-channel-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const channelName = document.getElementById('channel-name').value;
    if (!channels.includes(channelName)) {
        channels.push(channelName);
        renderChannels();
        renderChannelSelects();
        alert(`Channel "${channelName}" created successfully!`);
    }
});

document.getElementById('remove-channel').addEventListener('click', function () {
    const selectedChannel = document.getElementById('channels-dropdown').value;
    channels = channels.filter(channel => channel !== selectedChannel);
    renderChannels();
    renderChannelSelects();
    alert(`Channel "${selectedChannel}" removed!`);
});

document.getElementById('assign-user-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const channel = document.getElementById('channel-select').value;
    const userUsername = document.getElementById('user-username').value;
    const user = users.find(u => u.username === userUsername);
    if (user && !user.channels.includes(channel)) {
        user.channels.push(channel);
        alert(`User "${userUsername}" assigned to channel "${channel}"!`);
    }
});

document.getElementById('deassign-user-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const channel = document.getElementById('channel-deassign').value;
    const userUsername = document.getElementById('deassign-username').value;
    const user = users.find(u => u.username === userUsername);
    if (user && user.channels.includes(channel)) {
        user.channels = user.channels.filter(ch => ch !== channel);
        alert(`User "${userUsername}" de-assigned from channel "${channel}"!`);
    }
});

function renderChannels() {
    const dropdown = document.getElementById('channels-dropdown');
    dropdown.innerHTML = channels.map(channel => `<option value="${channel}">${channel}</option>`).join('');
}

function renderChannelSelects() {
    const selects = [document.getElementById('channel-select'), document.getElementById('channel-deassign')];
    selects.forEach(select => {
        select.innerHTML = channels.map(channel => `<option value="${channel}">${channel}</option>`).join('');
    });
}