import { render, screen } from "@testing-library/react";
import VideoCard from "../VideoCard";
import { mockVideo } from "./MockData";
import { useVideoCard } from "../Hooks/useVideoCard";

// Mock the dependencies
jest.mock("../Hooks/useVideoCard");
jest.mock("../Atoms/VideoPlayer", () => () => <div data-testid="video-player" />);
jest.mock("../Atoms/VideoAvatar", () => () => <div data-testid="video-avatar" />);
jest.mock("../Atoms/VideoInfo", () => () => <div data-testid="video-info" />);

describe("VideoCard", () => {
  beforeEach(() => {
    (useVideoCard as jest.Mock).mockReturnValue({
      videoRef: { current: null },
      handlePostClick: jest.fn(),
      handleMouseEnter: jest.fn(),
      handleMouseLeave: jest.fn(),
    });
  });

  it("renders the VideoCard and its sub-components", () => {
    render(<VideoCard post={mockVideo} />);
    
    expect(screen.getByTestId("video-player")).toBeInTheDocument();
    expect(screen.getByTestId("video-avatar")).toBeInTheDocument();
    expect(screen.getByTestId("video-info")).toBeInTheDocument();
  });

  it("logs the post to console (as in current implementation)", () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    render(<VideoCard post={mockVideo} />);
    expect(consoleSpy).toHaveBeenCalledWith(mockVideo);
    consoleSpy.mockRestore();
  });
});

