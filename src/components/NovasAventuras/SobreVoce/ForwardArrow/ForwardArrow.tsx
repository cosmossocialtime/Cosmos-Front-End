import { ArrowLeft, ArrowRight } from "phosphor-react";
import { FormEvent } from "react";
import { Container, LinkButtonBackward, LinkButtonForwards } from "./style";

interface ForwardArrowProps {
  to: string;
  back: string;
  page: number;
  isActive?: number;
  onClickForward?(e: FormEvent): void;
}

export function ForwardArrow({
  to,
  back,
  page,
  isActive,
  onClickForward
}: ForwardArrowProps) {
  return (
    <>
      <Container>

        <div>
          <LinkButtonBackward href={back}>
            <ArrowLeft />
          </LinkButtonBackward>

          {page === 0 ? "" : <p>{page}/4</p>}
          

          <LinkButtonForwards
            onClick={onClickForward}
            href={isActive ? to : "#"}
            disable={isActive}
          >
            <ArrowRight />
          </LinkButtonForwards>
        </div>
      </Container>
    </>
  );
}
