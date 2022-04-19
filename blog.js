// submit -> addBlog -> push ke blogs
// object mobil => ban, warna, merk, kapasistas mesin 
// array showRoom => mobil,mobil,mobil
let blogs = []

const month = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember'
]

function addBlog(event) {
  event.preventDefault()

  let title = document.getElementById("input-blog-title").value
  let content = document.getElementById("input-blog-content").value
  let image = document.getElementById("input-blog-image")

  image = URL.createObjectURL(image.files[0])

  let blog = {
    title: title,
    content: content,
    image: image,
    postedAt: new Date()
  }

  blogs.push(blog)

  console.table(blogs)
  // console.log(`Panjang array : ${blogs.length}`);

  let testInnerHTML = document.getElementById("test")

  renderBlog()
}

function renderBlog() {
  let containerBlog = document.getElementById("contents")
  containerBlog.innerHTML = firstBlogContent()

  for (let i = 0; i < blogs.length; i++) {
    containerBlog.innerHTML += `
       <div class="blog-list-item">
       <div class="blog-image">
         <img src="${blogs[i].image}" alt="" />
       </div>
       <div class="blog-content">
         <div class="btn-group">
           <button class="btn-edit">Edit Post</button>
           <button class="btn-post">Post Blog</button>
         </div>
         <h1>
           <a href="blog-detail.html" target="_blank">${blogs[i].title}</a>
         </h1>
         <div class="detail-blog-content">
           ${getFullTime(blogs[i].postedAt)} | Ichsan Emrald Alamsyah
         </div>
         <p>
           ${blogs[i].content}
         </p>
         <div style="text-align: right;">
           <span style="font-size: 15px; color: grey;">${getDistanceTime(blogs[i].postedAt)}</span>
         </div>
       </div>
     </div>
       `
  }
}

function getFullTime(time) {
  // merubah format waktu -> butuh waktu yang akan diubah
  console.log(time)

  const date = time.getDate()
  const monthIndex = time.getMonth()
  const year = time.getFullYear()

  const hour = time.getHours()
  let minute = time.getMinutes()

  if (minute < 10) {
    minute = '0' + minute
  }

  return `${date} ${month[monthIndex]} ${year} ${hour}:${minute} WIB `
}

function getDistanceTime(time) {
  // console.log(typeof time);
  // selisih waktu saat ini - waktu postingan = selisih waktu
  const distance = new Date() - new Date(time)
  //convert to day
  const miliseconds = 1000
  const secondInMinute = 60
  const minuteInHour = 60
  const secondInHour = secondInMinute * minuteInHour // 3600
  const hourInDay = 23

  let dayDistance = distance / (miliseconds * secondInHour * hourInDay)

  if (dayDistance >= 1) {
    const time = Math.floor(dayDistance) + ' day ago'
    return time
  } else {
    let hourDistance = Math.floor(distance / (miliseconds * secondInHour))
    if (hourDistance > 0) {
      return hourDistance + ' hour ago'
    } else {
      let minuteDistance = Math.floor(distance / (miliseconds * secondInMinute))
      return minuteDistance + ' minute ago'
    }
  }
}

setInterval(function () {
  renderBlog()
}, 2000)

function firstBlogContent() {
  return `
  <div class="list">
  <div class="list-img">
    <img src="assets/img/foto1.jpg"/>
  </div>
  <div class="list-title">
    <h6>Dumbways mobile App - 2021</h6>
  </div>
  <div class="list-time">
    <span style="font-size: 15px; color: grey;">1 hour ago</span>
  </div>
  <div class="list-contain">
    <p> Lorem ipsum dolor sit amet.
    </p>
  </div>
  <div>
    <img src="assets\img\linkedin.png" style="height: 30px; height: 27px; margin-right: 10px;">
    <img src="assets\img\instagram.png" style="height: 30px; height: 27px; margin-right: 10px;">
    <img src="assets\img\facebook.png" style="height: 30px; height: 27px; margin-right: 10px;">
</div>
<div class="list-parent">
  <div>
    <button type="button">edit</button>
  </div>
  <div>
    <button type="button">delete</button>
  </div>

    `
}