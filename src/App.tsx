import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";

import ContentHome from "./pages/Content/ContentHome";
import ContentAboutUs from "./pages/Content/ContentAboutUs";
import ContentContactUs from "./pages/Content/ContentContactUs";
import ContentNgo from "./pages/Content/ContentNgo";
import ContentNgosRegistration from "./pages/Content/ContentNgosRegistration";
import ContentStatistics from "./pages/Content/ContentStatistics";
import ContentEducation from "./pages/Content/ContentEducation";
import ContentEvents from "./pages/Content/ContentEvents";
import ContentProjects from "./pages/Content/ContentProjects";
import ContentGoodPractice from "./pages/Content/ContentGoodPractice";
import ContentOngoingProjects from "./pages/Content/ContentOngoingProjects";
import ContentCompletedProjects from "./pages/Content/ContentCompletedProjects";
import ContentCollaborationOpportunities from "./pages/Content/ContentCollaborationOpportunities";
import ContentDataArchive from "./pages/Content/ContentDataArchive";
import ContentFooter from "./pages/Content/ContentFooter";

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Home />} />

            {/* Content */}
            <Route index path="/content/home" element={<ContentHome />} />
            <Route
              index
              path="/content/about-us"
              element={<ContentAboutUs />}
            />
            <Route
              index
              path="/content/contact-us"
              element={<ContentContactUs />}
            />
            <Route index path="/content/ngo" element={<ContentNgo />} />
            <Route
              index
              path="/content/ngos-registration"
              element={<ContentNgosRegistration />}
            />
            <Route
              index
              path="/content/statistics"
              element={<ContentStatistics />}
            />
            <Route
              index
              path="/content/education"
              element={<ContentEducation />}
            />
            <Route index path="/content/events" element={<ContentEvents />} />
            <Route
              index
              path="/content/projects"
              element={<ContentProjects />}
            />
            <Route
              index
              path="/content/good-practice"
              element={<ContentGoodPractice />}
            />
            <Route
              index
              path="/content/ongoing-projects"
              element={<ContentOngoingProjects />}
            />
            <Route
              index
              path="/content/completed-projects"
              element={<ContentCompletedProjects />}
            />
            <Route
              index
              path="/content/collaboration-opportunities"
              element={<ContentCollaborationOpportunities />}
            />
            <Route
              index
              path="/content/data-archive"
              element={<ContentDataArchive />}
            />
            <Route index path="/content/footer" element={<ContentFooter />} />

            {/* Others Page */}
            <Route path="/profile" element={<UserProfiles />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/blank" element={<Blank />} />

            {/* Forms */}
            <Route path="/form-elements" element={<FormElements />} />

            {/* Tables */}
            <Route path="/basic-tables" element={<BasicTables />} />

            {/* Ui Elements */}
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badge" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} />

            {/* Charts */}
            <Route path="/line-chart" element={<LineChart />} />
            <Route path="/bar-chart" element={<BarChart />} />
          </Route>

          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
