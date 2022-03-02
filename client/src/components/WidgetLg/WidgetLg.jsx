import React from "react";
import "./widgetLg.css";

const Button = ({ type }) => {
  return <button className={"widgetLgButton " + type}>{type}</button>;
};

const WidgetLg = () => {
  return (
    <div className="widgetLg">
      <span className="widgetLgTitle">Latest transactions</span>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Customer</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Amount</th>
          <th className="widgetLgTh">Status</th>
        </tr>
        <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <span className="widgetLgName">1234</span>
          </td>
          <td className="widgetLgDate">12-12-2022</td>
          <td className="widgetLgAmount">$430</td>
          <td className="widgetLgStatus">
            <Button type="approved" />
          </td>
        </tr>
        <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <span className="widgetLgName">1234</span>
          </td>
          <td className="widgetLgDate">12-12-2022</td>
          <td className="widgetLgAmount">$430</td>
          <td className="widgetLgStatus">
            <Button type="declined" />
          </td>
        </tr>
        <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <span className="widgetLgName">1234</span>
          </td>
          <td className="widgetLgDate">12-12-2022</td>
          <td className="widgetLgAmount">$430</td>
          <td className="widgetLgStatus">
            <Button type="pending" />
          </td>
        </tr>
        <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <span className="widgetLgName">1234</span>
          </td>
          <td className="widgetLgDate">12-12-2022</td>
          <td className="widgetLgAmount">$430</td>
          <td className="widgetLgStatus">
            <Button type="approved" />
          </td>
        </tr>
      </table>
    </div>
  );
};

export default WidgetLg;
