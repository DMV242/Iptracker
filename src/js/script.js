import icon from "url:../images/icon-location.svg";

const map = L.map("map");
let marker;
const myIcon = L.icon({
  iconUrl: `${icon}`,
  iconSize: [38, 40],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
  shadowSize: [68, 95],
  shadowAnchor: [22, 94],
});
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);
// Initailize map
map.setView([-22.908333, -43.196388], 13);
marker = L.marker([-22.908333, -43.196388], {
  icon: myIcon,
}).addTo(map);
marker
  .bindPopup(
    "Welcome to our website enter the ip<br/> address you are looking for in the field above"
  )
  .openPopup();

const ipAddress = document.querySelector(".ipAddress");
const location = document.querySelector(".location");
const timezone = document.querySelector(".timezone");
const isp = document.querySelector(".isp");

document.querySelector("form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const ip_address = document.querySelector("#ipaddress").value;
  console.log(ip_address);
  const param = ip_address.split(".").length === 4 ? "ipAddress" : "domain";
  try {
    const req = await fetch(
      `https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_JnjOVKbYXCjwdq364RVVoQ0c6Nwge&${param}=${ip_address}`
    );
    if (!req.ok) throw new Error("ip not found");
    const data = await req.json();
    console.log(data);
    ipAddress.textContent = data.ip;
    location.textContent = data.location.country;
    location.textContent += ", " + data.location.city;
    timezone.textContent = data.location.timezone;
    isp.textContent = data.isp;
    map.setView([data.location.lat, data.location.lng], 13, { animate: true });

    marker.setLatLng([data.location.lat, data.location.lng]);

    marker.bindPopup("He is here").openPopup();
  } catch (err) {
    // alert("une erreur s'est produite lors de la recherche");
    Toastify({
      text: "The IP address or domain name you have entered is not correct.",
      className: "info",
      style: {
        background: "linear-gradient(to right, #f03e3e,#ff6b6b)",
        width: "400px",
      },
    }).showToast();
  }
});
