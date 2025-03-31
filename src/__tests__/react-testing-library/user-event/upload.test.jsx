import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const UploadComponent = inputProps => (
  <div>
    <label htmlFor="file-uploader">Upload file:</label>
    <input id="file-uploader" type="file" {...inputProps} />
  </div>
);

describe("Uploads", () => {
  test("upload file", async () => {
    const user = userEvent.setup();
    render(<UploadComponent />);

    const file = new File(["hello"], "hello.png", { type: "image/png" });
    const input = screen.getByLabelText(/upload file/i);

    await user.upload(input, file);

    expect(input.files[0]).toBe(file);
    expect(input.files.item(0)).toBe(file);
    expect(input.files).toHaveLength(1);
  });

  test("upload multiple files", async () => {
    const user = userEvent.setup();
    render(<UploadComponent multiple />);

    const files = [
      new File(["hello"], "hello.png", { type: "image/png" }),
      new File(["world"], "world.png", { type: "image/png" }),
    ];
    const input = screen.getByLabelText(/upload file/i);

    await user.upload(input, files);

    expect(input.files).toHaveLength(2);
    expect(input.files[0]).toBe(files[0]);
    expect(input.files[1]).toBe(files[1]);
  });
});
