function EmployeeCard({ name, designation, salary, experience }) {
  return (
    <div>
      <h3>{name}</h3>
      <p>Designation: {designation}</p>
      <p>Salary: {salary}</p>
      <p>Experience: {experience}</p>
      <button>View Profile</button>
      <hr />
    </div>
  );
}

export default EmployeeCard;