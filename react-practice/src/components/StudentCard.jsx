function StudentCard({ name, course, age }) {
  return (
    <div>
      <h3>{name}</h3>
      <p>Course: {course}</p>
      <p>Age: {age}</p>
      <hr />
    </div>
  );
}

export default StudentCard;