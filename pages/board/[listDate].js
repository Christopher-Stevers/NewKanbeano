import styles from "../../styles/listPage.module.scss";
import NewContext from "../../components/newContext";
import GetBoard from "../api/components/getBoard";
import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import Head from "next/head";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useState, useEffect } from "react";
import CardContainer from "../../components/indieContainer";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
import { useSession, getSession } from "next-auth/client";
import Header from "../../components/header";
import ColorPicker from "../../components/colorPicker";
export default function Home({ data }) {
  const [session] = useSession();
  const router = useRouter();
  const { listDate } = router.query;
  const ogDate = new Date(parseInt(listDate)).toDateString();
  const current = Date.now();
  const [contextState, updateContextState] = useState(data);
  const [isInvite, updateIsInvite] = useState(false);
  const [email, updateEmail] = useState("");
  const [auth, updateAuth] = useState(true);
  const [h2, updateH2] = useState("");
  const [success, updateSuccess] = useState(false);
  const formatDate = (input) => {
    const dateRegex = /([A-z]{3})(.{5})(\d+)(.{5})/;
    return input.replace(dateRegex, "$1, $2 $3, $4");
  };
  const [text, updateText] = useState("");
  useEffect(() => {
    async () => {
      if (session) {
        const url = "/" + "api/movies?listDate=" + router.query.listDate;
        const response = await fetch(url);
        const responseObj = await response.json();
        if (typeof responseObj[0] === "string") {
          updateAuth(false);
        } else {
          updateAuth(true);
          updateContextState(responseObj.data);
          updateH2(responseObj.listTitle);
        }
      }
    };
  }, [router.query.listDate, session]);

  // If no session exists, display access denied message
  if (!session) {
    return (
      <div>
        {" "}
        <Header />{" "}
        <span>
          This board either does not exist, or you do not own it.
        </span>{" "}
      </div>
    );
  }

  const addList = () => {
    updateContextState(
      contextState.concat([
        [
          {
            title: "",
            listDate: current + 1,
          },
        ],
      ])
    );
  };

  const postToAPI = async (stateOfContext) => {
    const clone = JSON.parse(JSON.stringify(stateOfContext));

    const options = {
      method: "POST",
      body: JSON.stringify(clone),
    };

    const url = "/" + "api/movies?listDate=" + router.query.listDate;
    await fetch(url, JSON.parse(JSON.stringify(options)));
    //if (response.status === 200) { }
  };
  const inviteMember = () => {
    isInvite ? updateIsInvite(false) : updateIsInvite(true);
  };
  const addMember = async (e) => {
    e.preventDefault();
    const options = {
      method: "POST",
      body: JSON.stringify({ email: email }),
    };
    const addURL = "/api/adduser?listDate=" + router.query.listDate;

    const response = await fetch(addURL, options);
    const responseObj = await response.json();
    const { result } = responseObj;
    if (response.status === 200) {
      if (result === "already") {
        updateText(`${email} is already a member.`);
      } else if (result === "success") {
        updateText(`${email} has been added to this board.`);
      } else if (result === "failiure") {
        updateText("Sorry, an error occured.");
      }
      updateIsInvite(false);
      updateSuccess(true);
      setTimeout(function () {
        updateSuccess(false);
      }, 3000);
    }
  };
  const clone = JSON.parse(JSON.stringify(contextState));
  function handleOnDragEnd(result) {
    if (result.destination === null) {
      return;
    }
    if (result.type === "nestedList") {
      const droppableSource = parseInt(result.source.droppableId);
      const droppableDestination = parseInt(result.destination.droppableId);
      const draggedContext = clone.map((elem, index) => {
        if (index === parseInt(result.destination.droppableId)) {
          const clonedContext = JSON.parse(JSON.stringify(clone));
          const notZero = result.destination.index
            ? result.destination.index
            : 1;
          const [reorderedItem] = clonedContext[droppableSource].splice(
            result.source.index,
            1
          );
          clonedContext[droppableDestination].splice(notZero, 0, reorderedItem);

          return clonedContext;
        }
      });
      const nextContext = JSON.parse(
        JSON.stringify(draggedContext[parseInt(droppableDestination)])
      );
      updateContextState(nextContext);
      postToAPI(nextContext);
      return;
    }
    if (result.type === "parentList") {
      const clonedContext = JSON.parse(JSON.stringify(contextState));
      const [reorderedItem] = clonedContext.splice(result.source.index, 1);
      clonedContext.splice(result.destination.index, 0, reorderedItem);
      updateContextState(clonedContext);

      postToAPI(clonedContext);
    }
    return 0;
  }

  return (
    <>
      <div>
        <Head>
          <title>{h2}</title>

          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <Header />
        {auth ? (
          <>
            <div className={styles.listHeader}>
              <h2 className={styles.h2}>{h2}</h2>

              {isInvite ? null : (
                <button onClick={inviteMember} className={styles.invite}>
                  <svg
                    className={styles.user}
                    version="1.1"
                    x="0px"
                    y="0px"
                    width="100px"
                    height="100px"
                    viewBox="0 0 100 100"
                    enableBackground="new 0 0 100 100"
                  >
                    <g id="_x37_7_Essential_Icons">
                      <path
                        id="Users"
                        d="M78.2,58.2C81.1,55.8,83,52.1,83,48c0-6.9-5.6-13-12-13s-12,6.1-12,13c0,4.1,1.9,7.8,4.8,10.2
		c-1.3,0.5-2.5,1-3.7,1.7c-3.8-4.5-8.8-8-14.6-9.7C49.9,47.1,53,41.8,53,36c0-9.1-7.5-17-16-17c-8.5,0-16,7.9-16,17
		c0,5.8,3.1,11.1,7.5,14.2C16.1,53.9,7,65.4,7,79c0,1.1,0.9,2,2,2h82c1.1,0,2-0.9,2-2C93,69.4,86.8,61.2,78.2,58.2z M63,48
		c0-4.2,3.5-9,8-9c4.5,0,8,4.8,8,9c0,4.2-3.5,9-8,9C66.5,57,63,52.2,63,48z M25,36c0-6.1,5.1-13,12-13c6.9,0,12,6.9,12,13
		s-5.1,13-12,13C30.1,49,25,42.1,25,36z M11.1,77c1-13.4,12.3-24,25.9-24c13.7,0,24.9,10.6,25.9,24H11.1z M66.9,77
		c-0.3-5-1.9-9.8-4.5-13.8C65,61.8,67.9,61,71,61c9.3,0,16.9,7,17.9,16H66.9z"
                      />
                      <span>+</span>
                    </g>
                    <g id="Guides"></g>
                    <g id="Info">
                      <g id="BORDER">
                        <path
                          fill="#0000FF"
                          d="M1084-790V894H-700V-790H1084 M1092-798H-708V902h1800V-798L1092-798z"
                        />
                      </g>
                    </g>
                  </svg>
                  <span>+</span>
                </button>
              )}
              {success ? <div className={styles.emailAdded}>{text}</div> : null}

              <span className={styles.date}>
                {" "}
                Created <time>{formatDate(ogDate)}</time>
              </span>
            </div>
            <main className={styles.boardMain}>
              <DragDropContext onDragEnd={handleOnDragEnd}>
                <NewContext.Provider
                  value={[contextState, updateContextState, postToAPI]}
                >
                  <div className={styles.flexWrapper}>
                    {" "}
                    <Droppable
                      key={1}
                      droppableId="kingOfTheDrops"
                      direction="horizontal"
                      type="parentList"
                    >
                      {(provided) => (
                        <div
                          className={styles.list}
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                        >
                          {contextState.map((elem, index) => {
                            return (
                              <Draggable
                                key={uuidv4()}
                                draggableId={index.toString() + "topLevel"}
                                index={index}
                              >
                                {(provided) => (
                                  <div
                                    className={styles.listItem}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    <CardContainer i={index} />{" "}
                                  </div>
                                )}
                              </Draggable>
                            );
                          })}

                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                    <div>
                       <div className={styles.addList}>
                          <button className={styles.button} onClick={addList}>
                            +
                          </button>
                        </div>
                    </div>
                  </div>
                </NewContext.Provider>
              </DragDropContext>
            </main>
          </>
        ) : (
          <div>
            Access denied, this is not your board <Link href="/">Home</Link>
          </div>
        )}
      </div>

      <ColorPicker />

      {isInvite ? (
        <div
          onClick={() => updateIsInvite(false)}
          className={styles.overlayGrid}
        >
          <form
            onClick={(e) => e.stopPropagation()}
            className={styles.addModal}
          >
            <span>
              {" "}
              <label>New members{"'"} email</label>{" "}
              <input
                onChange={(e) => updateEmail(e.target.value)}
                placeholder="email@provider.com"
                type="email"
                value={email}
              ></input>
            </span>
            <button type="submit" onClick={addMember}>
              Invite Member
            </button>
          </form>
        </div>
      ) : null}
    </>
  );
}

Home.propTypes = {
  data: PropTypes.array.isRequired,
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const emptyArr = [];
  if (!session) {
    return { props: { emptyArr } };
  }
  const document = await GetBoard(context, session);
  const data = document.data;
  return { props: { data } };
}
