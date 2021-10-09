import React from "react";
import { JournalList } from "./journal-list/journal-list";
import { JournalEdit } from "./journal-edit/journal-edit";
import { Switch, Route } from "react-router-dom";
import { PageContainer } from "../shared/page-container/page-container";

const Journal = (props: any) => {
  return (
    <Switch>
      <Route exact path={`/journal`}>
        <PageContainer>
          <JournalList allCards={props.allCards} />
        </PageContainer>
      </Route>
      <Route path={`/journal/edit`}>
        <PageContainer>
          <JournalEdit allCards={props.allCards} />
        </PageContainer>
      </Route>
    </Switch>
  );
};

export { Journal };
