function EventDemo() {
  function handleClick() {
    alert("Button Clicked!");
  }

  function showMessage() {
    console.log("Hello React");
  }

  function openReactWebsite() {
    window.open("https://react.dev");
  }

  function downloadResume() {
    alert("Resume Downloaded");
  }

  return (
    <div>
      <h2>Event Handling Demo</h2>

      <button onClick={handleClick}>Click Me</button>

      <button onClick={showMessage}>Show Console Message</button>

      <button onClick={openReactWebsite}>Open React Website</button>

      <button onClick={downloadResume}>Download Resume</button>
    </div>
  );
}

export default EventDemo;