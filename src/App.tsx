import ButtonGroup from "@atlaskit/button/button-group";
import Button, { IconButton } from "@atlaskit/button/new";
import Heading from "@atlaskit/heading";
import LightbulbIcon from "@atlaskit/icon/core/lightbulb";
import CrossIcon from "@atlaskit/icon/glyph/cross";
import Image from "@atlaskit/image";
import Modal, { ModalTransition } from "@atlaskit/modal-dialog";
import {
  Spotlight,
  SpotlightManager,
  SpotlightPulse,
  SpotlightTarget,
  SpotlightTransition,
} from "@atlaskit/onboarding";
import { Box, Grid, Inline, Stack } from "@atlaskit/primitives";
import { N0 } from "@atlaskit/theme/colors";
import { differenceInMinutes } from "date-fns";
import React, { useCallback, useEffect, useState } from "react";
import { AlarmClock } from "./components/AlarmClock";
import Hint from "./components/Hint";
import Tile from "./components/Tile";
import helloGif from "./images/hello.gif";
import iLoveYouGif from "./images/i-love-you.gif";
import inLoveGif from "./images/in-love.gif";
import omgGif from "./images/omg.gif";
import wakingUpPanic from "./images/waking-up-panic.gif";
import {
  backgroundStyles,
  centerStyles,
  closeContainerStyles,
  entranceStyles,
  gridStyles,
  heartStyles,
  imageContainerStyles,
  scoreStyles,
  scoreWrapperStyles,
  spotlightTargetStyles,
  tableStyles,
  welcomeTextStyles,
  winPageStyles,
} from "./styles";
import { calculateHints, generateBoard } from "./utils/gameLogic";

const App: React.FC = () => {
  const [board, setBoard] = useState(generateBoard());
  const [isGameOver, setIsGameOver] = useState(false);
  const [seeEnd, setSeeEnd] = useState(false);
  const { rowHints, columnHints } = calculateHints(board);

  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  const [activeSpotlight, setActiveSpotlight] = useState<null | number>(null);

  const next = () => setActiveSpotlight((activeSpotlight || 0) + 1);
  const end = () => {
    setStartTime(new Date());
    setActiveSpotlight(null);
  };

  const [firstGlance, setFirstGlance] = useState(true);

  const [usedHint, setUsedHint] = useState(false);

  const openModal = useCallback(() => setIsGameOver(true), []);
  const closeGameOverModal = useCallback(() => setIsGameOver(false), []);

  const [score, setScore] = useState(0);

  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    // Check if all non-Voltorb tiles are flipped
    const allSafeTilesFlipped = board.every((row) =>
      row.every((tile) => tile.type === "voltorb" || tile.flipped)
    );

    // If all non-Voltorb tiles are flipped, the game is won
    if (allSafeTilesFlipped) {
      setEndTime(new Date());
      setGameWon(true);
    }
  }, [board]);

  const resetGame = useCallback(() => {
    setScore(0);
    setBoard(generateBoard());
    closeGameOverModal();
  }, [closeGameOverModal]);

  const flipTile = useCallback(
    (row: number, col: number) => {
      const tile = board[row][col];
      if (tile.flipped) return;

      const updatedBoard = [...board];
      updatedBoard[row][col].flipped = true;

      setScore((prevScore) =>
        tile.type === "voltorb" ? prevScore : prevScore + tile.value
      );

      if (tile.type === "voltorb") {
        openModal(); // Open modal on game over
      }

      setBoard(updatedBoard);
    },
    [board, openModal]
  );

  const useHint = () => {
    if (usedHint) return;
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        const tile = board[row][col];
        if (!tile.flipped && tile.type !== "voltorb") {
          const updatedBoard = [...board];
          updatedBoard[row][col].flipped = true;
          setScore((prevScore) => prevScore + tile.value);
          setBoard(updatedBoard);
          setUsedHint(true);
          return;
        }
      }
    }
  };

  const renderActiveSpotlight = () => {
    const spotlights = [
      <Spotlight
        actionsBeforeElement="1/6"
        actions={[
          { onClick: () => next(), text: "Next" },
          { onClick: () => end(), text: "Dismiss", appearance: "subtle" },
        ]}
        heading="Surprise!"
        target="welcome"
        key="welcome"
        targetRadius={3}
        targetBgColor={N0}
        image={omgGif}
      >
        <p>
          A game just for you, reminiscent of your current obsession... with
          some slight twists.
        </p>
        <p>
          I know you're an expert at this game already, but I was excited by the
          spotlight features, and there are a few things to tell you before you
          start. So please don't dismiss these instructions!
        </p>
      </Spotlight>,
      <Spotlight
        actionsBeforeElement="2/6"
        actions={[
          { onClick: () => next(), text: "Next" },
          { onClick: () => end(), text: "Dismiss", appearance: "subtle" },
        ]}
        heading="Voltorb Flip... but different"
        target="clock"
        key="clock"
        targetRadius={3}
        targetBgColor={N0}
      >
        <p>
          Instead of voltorbs, you'll find alarm clocks (since we both know you
          don't like those).
        </p>
        <p>Similar to Voltorb Flip, if you find one, the game's over.</p>
      </Spotlight>,
      <Spotlight
        actionsBeforeElement="3/6"
        actions={[
          {
            onClick: () => next(),
            text: "Next",
          },

          { onClick: () => end(), text: "Dismiss", appearance: "subtle" },
        ]}
        heading="Same as usual:"
        target="tile"
        key="tile"
        targetRadius={3}
        targetBgColor={N0}
      >
        Flip a tile by clicking on it. Any points you find will be added to your
        score.
      </Spotlight>,
      <Spotlight
        actionsBeforeElement="4/6"
        actions={[
          {
            onClick: () => next(),
            text: "Next",
          },
          { onClick: () => end(), text: "Dismiss", appearance: "subtle" },
        ]}
        heading="Reading comprehension"
        target="score"
        key="score"
        targetRadius={3}
        targetBgColor={N0}
      >
        <p>Here's where your score lives.</p>
        <p>
          Unlike Voltorb Flip, you can't exit early and collect your points -
          you either win or you lose.
        </p>
        <p>(And I think you'll want to win - at least, I'd like you to)</p>
      </Spotlight>,
      <Spotlight
        actionsBeforeElement="5/6"
        actions={[
          {
            onClick: () => next(),
            text: "Next",
          },
          { onClick: () => end(), text: "Dismiss", appearance: "subtle" },
        ]}
        heading="🚨🚨 New feature alert"
        target="crutch"
        key="crutch"
        targetRadius={3}
        targetBgColor={N0}
      >
        <p>
          I was thinking it was a little harsh you'll have to win it all to win
          at all.
        </p>
        <p>
          In case you're struggling, I've given you a crutch: this will
          immediately flip a tile on the board that's guaranteed safe.
        </p>
        <p>You're limited to one use per game.</p>
      </Spotlight>,
      <Spotlight
        actionsBeforeElement="6/6"
        actions={[
          { onClick: () => end(), text: "Start" },
          { onClick: () => end(), text: "Dismiss", appearance: "subtle" },
        ]}
        heading="Use hints"
        target="hints"
        key="hints"
        targetRadius={3}
        targetBgColor={N0}
      >
        <p>
          Each row and column has a hint. The counts work the exact same way as
          in Voltorb Flip.
        </p>
        <p>...and I think you're ready to go now!</p>
      </Spotlight>,
    ];

    if (activeSpotlight === null) {
      return null;
    }

    return spotlights[activeSpotlight];
  };

  return (
    <SpotlightManager>
      <Box
        xcss={backgroundStyles}
        backgroundColor="color.background.accent.magenta.subtler"
      >
        {seeEnd ? (
          <Box xcss={winPageStyles}>
            <Stack>
              <Heading size="xxlarge">Sam, will you be my Valentine?</Heading>
              <Box xcss={heartStyles}>
                <Image src={inLoveGif} alt="Graphic showing penguin in love" />
                <Stack space="space.100">
                  <Heading size="small">
                    I love you more than you know. You mean everything to me.
                  </Heading>
                  <Heading size="xsmall">
                    I really enjoyed making this - it was a fun project that I
                    hope you also enjoyed.
                  </Heading>
                  <Heading size="xsmall">
                    Thank you for being my best friend, my favorite person, my
                    soulmate; the person I constantly reminisce over and can't
                    wait to spend a future with; who makes me feel incredibly
                    comfortable, safe, and loved; who I've missed dearly while
                    making this.
                  </Heading>
                  <Heading size="xsmall">
                    I especially love you now that you've won the game
                  </Heading>
                  <Heading size="xxsmall">
                    I would also really like it if you asked me to be yours
                  </Heading>
                  <Heading size="xxsmall">
                    You can also play again if you want:
                    <Button
                      onClick={() => {
                        resetGame();
                        setGameWon(false);
                        setSeeEnd(false);
                      }}
                      spacing="compact"
                      appearance="discovery"
                    >
                      Play again
                    </Button>
                  </Heading>
                </Stack>
              </Box>
            </Stack>
          </Box>
        ) : firstGlance ? (
          <Stack xcss={entranceStyles} space="space.200">
            <Heading size="xlarge">Why hello there</Heading>
            <Image src={helloGif} alt="Graphic showing penguin waving hello" />
            <Box xcss={spotlightTargetStyles}>
              <SpotlightTarget name="start">
                <SpotlightPulse
                  radius={3}
                  pulse={activeSpotlight ? false : true}
                >
                  <Button
                    onClick={() => {
                      setFirstGlance(!firstGlance);
                      setActiveSpotlight(0);
                    }}
                  >
                    Proceed
                  </Button>
                </SpotlightPulse>
              </SpotlightTarget>
            </Box>
          </Stack>
        ) : (
          <Stack>
            <SpotlightTarget name="welcome">
              <Inline xcss={welcomeTextStyles} space="space.100">
                <SpotlightTarget name="clock">
                  <AlarmClock />
                </SpotlightTarget>
                <Heading size="xlarge">Alarm Escape</Heading>
              </Inline>
            </SpotlightTarget>
            <Inline space="space.100" xcss={scoreWrapperStyles}>
              <SpotlightTarget name="score">
                <Box
                  xcss={scoreStyles}
                  backgroundColor="color.background.accent.purple.subtler"
                >
                  SCORE: {score}
                </Box>
              </SpotlightTarget>
              <SpotlightTarget name="crutch">
                <IconButton
                  isDisabled={usedHint}
                  onClick={() => {
                    setUsedHint(true);
                    useHint();
                  }}
                  icon={LightbulbIcon}
                  label="crutch"
                  appearance="discovery"
                />
              </SpotlightTarget>
            </Inline>
            <Box xcss={tableStyles}>
              {board.map((row, rowIndex) => (
                <Box key={rowIndex} paddingInlineStart="space.400">
                  <Grid templateColumns="repeat(6, 75px)" columnGap="space.050">
                    {row.map((tile, colIndex) => (
                      <>
                        {colIndex === 0 && rowIndex === 1 ? (
                          <SpotlightTarget name="tile">
                            <Tile
                              key={colIndex}
                              tile={tile}
                              onClick={() => flipTile(rowIndex, colIndex)}
                            />
                          </SpotlightTarget>
                        ) : (
                          <Tile
                            key={colIndex}
                            tile={tile}
                            onClick={() => flipTile(rowIndex, colIndex)}
                          />
                        )}
                      </>
                    ))}
                    <Hint
                      index={rowIndex as 0 | 1 | 2 | 3 | 4}
                      totalCount={rowHints[rowIndex].sum}
                      voltorbCount={rowHints[rowIndex].voltorbs}
                    />
                  </Grid>
                </Box>
              ))}
              <Box paddingInlineStart="space.400">
                <SpotlightTarget name="hints">
                  <Grid templateColumns="repeat(6, 75px)" columnGap="space.050">
                    {columnHints.map((hint, index) => (
                      <>
                        <Hint
                          index={index as 0 | 1 | 2 | 3 | 4}
                          totalCount={hint.sum}
                          voltorbCount={hint.voltorbs}
                        />
                      </>
                    ))}
                  </Grid>
                </SpotlightTarget>
              </Box>
            </Box>
          </Stack>
        )}

        {/* Game over modal */}
        <ModalTransition>
          {gameWon ? (
            <Modal>
              <Box padding="space.200" xcss={centerStyles}>
                <Stack xcss={entranceStyles} space="space.200">
                  <Image
                    src={iLoveYouGif}
                    alt="Graphic showing penguin saying I love you"
                  />
                  <Heading size="xlarge">
                    You won! ... in {differenceInMinutes(endTime, startTime)}{" "}
                    minutes.
                  </Heading>

                  <Box xcss={spotlightTargetStyles}>
                    <SpotlightTarget name="start">
                      <SpotlightPulse radius={3} pulse={true}>
                        <Button
                          onClick={() => {
                            setSeeEnd(true);
                            closeGameOverModal();
                            setGameWon(false);
                            setFirstGlance(false);
                          }}
                        >
                          Click me!
                        </Button>
                      </SpotlightPulse>
                    </SpotlightTarget>
                  </Box>
                </Stack>
              </Box>
            </Modal>
          ) : (
            isGameOver && (
              <Modal>
                <Box backgroundColor="color.background.accent.magenta.subtler">
                  <Grid
                    gap="space.0"
                    templateAreas={["image close"]}
                    xcss={gridStyles}
                  >
                    <Grid xcss={closeContainerStyles} justifyContent="end">
                      <IconButton
                        appearance="subtle"
                        icon={CrossIcon}
                        label="Close Modal"
                        onClick={closeGameOverModal}
                      />
                    </Grid>
                    <Grid xcss={imageContainerStyles} justifyContent="center">
                      <Image
                        src={wakingUpPanic}
                        alt="Graphic showing penguin waking up in panic"
                      />
                    </Grid>
                  </Grid>
                  <Box padding="space.300">
                    <Stack alignInline="center">
                      <Heading as="h1" size="medium">
                        You found an alarm! Try again.
                      </Heading>
                    </Stack>
                    <Box paddingBlockStart="space.500">
                      <Stack alignInline="center">
                        <ButtonGroup label="Switch options">
                          <Button appearance="subtle">Maybe later</Button>
                          <Button onClick={resetGame} appearance="discovery">
                            Try again
                          </Button>
                        </ButtonGroup>
                      </Stack>
                    </Box>
                  </Box>
                </Box>
              </Modal>
            )
          )}
        </ModalTransition>
      </Box>

      <SpotlightTransition>{renderActiveSpotlight()}</SpotlightTransition>
    </SpotlightManager>
  );
};

export default App;
