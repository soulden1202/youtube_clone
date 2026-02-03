import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import NavBarLogo from "../NavBarLogo";

// Mock the SideBar component since it's used inside
jest.mock("../../SideBar", () => () => <div data-testid="sidebar-mock" />);

describe("NavBarLogo", () => {
  const mockHandleOpen = jest.fn();
  const mockSetOpen = jest.fn();

  it("renders the logo and menu button", () => {
    render(<NavBarLogo open={false} setOpen={mockSetOpen} handleOpen={mockHandleOpen} />);
    
    // Check if the logo is present via alt text
    expect(screen.getByAltText("logo")).toBeInTheDocument();
    
    // Check if the sidebar is rendered
    expect(screen.getByTestId("sidebar-mock")).toBeInTheDocument();
  });

  it("calls handleOpen when the menu button is clicked", () => {
    render(<NavBarLogo open={false} setOpen={mockSetOpen} handleOpen={mockHandleOpen} />);
    
    const menuButton = screen.getByRole("button");
    fireEvent.click(menuButton);
    
    expect(mockHandleOpen).toHaveBeenCalledTimes(1);
  });
});

