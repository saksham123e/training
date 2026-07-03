function StudentCard(props) {
  return (
    <div>
      <h2>{props.name}</h2>
      <p>{props.course}</p>
      <p>{props.age}</p>
    </div>
  );
}

export default StudentCard;