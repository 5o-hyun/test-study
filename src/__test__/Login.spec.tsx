import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  fireEvent,
  render,
  renderHook,
  screen,
  waitFor,
} from "@testing-library/react";
import LoginPage from "../pages/LoginPage";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import "@testing-library/jest-dom";
import * as nock from "nock";

const queryClient = new QueryClient({
  defaultOptions: {},
  // 터미널에서 400에러를 꺼줌 => react-query에서 권장하는방법  https://tanstack.com/query/v4/docs/framework/react/guides/testing
  //   logger: {
  //     log: console.log,
  //     warn: console.warn,
  //     error: process.env.NODE_ENV === "test" ? () => {} : console.error,
  //   },
});

describe("로그인 테스트", () => {
  /*
    mocking을 이용해 400에러를 좀 더 확실하게 직관적으로 꺼줌
    에러있을때는 아무것도 실행하지말아라, 그리고 테스트케이스 다 돌면 원상복구해라

    하지만 이 방법의 문제점은 실제 서버에 request가 들어간다.
    따라서, http request를 mocking하는 방법으로 개선할수있다. 
    이는 서버에서 bad request 온것처럼 구현하는것인데 nock이라는 패키지를 설치해서 구현할 수 있다. '$ npm install --save-dev nock' 참고문서: https://github.com/nock/nock
*/
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });

  test("로그인에 실패하면 에러메세지가 나타난다.", async () => {
    // given - 로그인 페이지가 그려짐
    const routes = [{ path: "/signup", element: <LoginPage /> }];

    const router = createMemoryRouter(routes, {
      initialEntries: ["/signup"],
      initialIndex: 0,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    );

    // when - 사용자가 로그인에 실패함
    nock("https://inflearn.byeongjinkang.com") // 서버에 요청하지않고 nock 패키지로 bad request를 만듬
      .post("/user/login/", {
        username: "wrong@email.com",
        password: "wrongPassword",
      })
      .reply(400, { id: "NO_SEARCH_USER" });

    const wrapper = ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
    const { result } = renderHook(() => useLogin(), { wrapper });

    /* 
        에러메세지 검증할떄 실제 http call이 안되서 테스트케이스 오류가 발생한다. 
        이메일과 비밀번호에 잘못된값을 넣고 로그인버튼을 눌러보면 테스트케이스는 성공했고 400에러가뜬다. 
    */
    const emailInput = screen.getByLabelText("이메일");
    const passwordInput = screen.getByLabelText("비밀번호");
    fireEvent.change(emailInput, { target: { value: "wrong@email.com" } });
    fireEvent.change(passwordInput, { target: { value: "wrongPassword" } });
    const loginButton = screen.getByRole("button", { name: "로그인" });
    fireEvent.click(loginButton);

    // then - 로그인 에러 메세지가 화면에 나타남
    await waitFor(() => result.current.isError);

    // 에러메세지검증
    const errorMessage = await screen.findByTestId("error-message");
    expect(errorMessage).toBeInTheDocument();
  });
});
