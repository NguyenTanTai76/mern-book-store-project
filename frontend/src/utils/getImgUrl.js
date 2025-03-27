function getImgUrl(name) {
  if (!name) return 'https://via.placeholder.com/150'; // Ảnh mặc định nếu không có ảnh

  if (name.startsWith('data:image') || name.startsWith('http')) {
    return name; // Nếu là Base64 hoặc URL online, trả về nguyên chuỗi
  }

  // Nếu là tên tệp ảnh trong thư mục assets/books/
  return new URL(`../assets/books/${name}`, import.meta.url).href;
}

export { getImgUrl };
