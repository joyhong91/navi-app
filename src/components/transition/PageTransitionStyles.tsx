import styled, { css } from "styled-components";

export const PageTransitionGroup = styled.div<{ timeout: number }>`
  position: relative;
  width: 100%;
  padding: 0 15px;
  perspective: 1200px;
  /* overflow: hidden; */

  ${({ timeout = 1000 }) => css`
    .slide-enter {
      opacity: 0;
      transform: translate3d(0, 0, 0);
    }

    .slide-enter-active {
      opacity: 1;
      transform: translate3d(100%, 0, 0);
      transition: opacity ${timeout}ms, transform ${timeout}ms;
    }

    .slide-exit {
      opacity: 1;
      transform: translate3d(-100%, 0, 0);
    }

    .slide-exit-active {
      opacity: 0;
      transform: translate3d(100%, 0, 0);
      transition: opacity ${timeout}ms, transform ${timeout}ms;
    }

    .slide-enter.slide-enter-active > .content {
        transform: translate3d(0, 0, 0);
        //Apply all transitions 
        transition: all 800ms ease-in-out;
      }
  `}}
`;

export const PageTransitionWrapper = styled.div`
  backface-visibility: hidden;
  /* height: 100%; */
  left: 0;
  overflow: hidden;
  position: absolute;
  top: 0;
  width: 100%;
`;
