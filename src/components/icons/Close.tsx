export default function CloseIcon({fill = 'black'}) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="24" height="24" fill="transparent" />
      <rect
        x="4"
        y="3"
        width="24"
        height="2"
        transform="rotate(45 4 3)"
        fill={fill}
      />
      <rect
        x="3"
        y="20"
        width="24"
        height="2"
        transform="rotate(-45 3 20)"
        fill={fill}
      />
    </svg>
  );
}
