import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@testing-library/jest-dom"; // jest로 테스트할때는 테스트파일에 이부분 꼭 import 해야한다.
import { fireEvent, render, screen } from "@testing-library/react";
import SignupPage from "../pages/SignupPage";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

const queryClient = new QueryClient({
  defaultOptions: {},
});

describe("회원가입 테스트", () => {
  test("비밀번호와 비밀번호 확인 값이 일치하지 않으면 에러메세지가 표시된다.", async () => {
    // 1. given 준비단계 - 회원가입 페이지가 그려짐
    // 회원가입 페이지는 react-router-dom(useNavigate)나 react-query등을 사용하고있기때문에 provider로 감싸줘야한다.
    const routes = [{ path: "/signup", element: <SignupPage /> }];

    const router = createMemoryRouter(routes, {
      initialEntries: ["/signup"],
      initialIndex: 0,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    );

    // 2. when 실행단계 - 비밀번호롸 비밀번호 확인 값이 일치하지 않음
    // 라벨값으로 input을 가져옴
    const passwordInput = screen.getByLabelText("비밀번호");
    const confirmPasswordInput = screen.getByLabelText("비밀번호 확인");

    // 테스트케이스 실패를 위해, 일부러 password와 wrongPassword에 다른값을 넣어줌
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "wrongPassword" },
    });

    // 3. then 검증단계 - 에러메세지가 표시됨
    // id가 error-message인 값을 찾아 존재하는지 확인, 에러메세지는 기다렸다가 실패시 띄워야하기때문에 await
    const errorMessage = await screen.findByTestId("error-message");
    expect(errorMessage).toBeInTheDocument();
  });
});
