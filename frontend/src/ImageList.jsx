const ImageList = ({ images }) => (
  <td>
    {images?.map((img, i) => (
      <img
        key={i}
        src={`${import.meta.env.VITE_IMAGE_URL}/${img}`}
        width="60"
        height="60"
        className="rounded-circle me-1"
      />
    ))}
  </td>
);

export default ImageList;
