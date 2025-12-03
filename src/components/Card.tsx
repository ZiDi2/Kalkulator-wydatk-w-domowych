import "../css/Card.css";

export function Card(props: any) {
  return (
    <>
      <div
        id="container"
        style={{ backgroundColor: props.color, marginTop: "2vh" }}
      >
        {props.children}
      </div>
    </>
  );
}
