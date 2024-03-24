import { PageWrapper } from "../../shared/components";
import { HomeHeader, HomeBoard } from "./components";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch } from "../../shared/hooks/index.ts";
import { GetDashboardById } from "../../store/dashboardSlice/thunks.ts";

export const HomePage = () => {
  /**
   * Hooks
   */
  const { id } = useParams();
  const dispatch = useAppDispatch();

  /**
   * Effects
   */
  useEffect(() => {
    if (!id) return;
    dispatch(GetDashboardById(id));
  }, [dispatch, id]);

  /**
   * Render
   */
  return (
    <PageWrapper>
      <HomeHeader />
      <HomeBoard />
    </PageWrapper>
  );
};
