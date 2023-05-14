/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
import { Project } from "types";

import React, { memo } from "react";

import { Text, Image } from "@project/libs/components";
import { DiagramLogo } from "@project/libs/assets/images";

import styles from "./styles.module.scss";

interface Props {
  project: Project;
}

export const TokenEconomicsContainer = memo<Props>((props: Props) => {
  const { project } = props;
  return (
    <div className={styles.token_economics_container}>
      <div className={styles.token_economics_content}>
        <Image url={DiagramLogo} className={styles.image} />

        <div className={styles.token_economics_right_part_content}>
          <Text type="h2" className={styles.title}>
            Token Economics & Vesting Schedule
          </Text>
          <div className={styles.table}>
            <table>
              <thead>
                <tr>
                  <th>Allocation</th>
                  <th>Percentage</th>
                  <th>Num of token</th>
                  <th>Token price</th>
                  <th>FDV</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Airdrop</td>
                  <td>1%</td>
                  <td>10.000.000</td>
                  <td>N/A</td>
                  <td>N/A</td>
                </tr>
                <tr>
                  <td>Community Emission</td>
                  <td>50%</td>
                  <td>500.000.000</td>
                  <td>N/A</td>
                  <td>N/A</td>
                </tr>
                <tr>
                  <td>Team & Advisor</td>
                  <td>20%</td>
                  <td>200.000.000</td>
                  <td>N/A</td>
                  <td>N/A</td>
                </tr>
                <tr>
                  <td>Treasury</td>
                  <td>21%</td>
                  <td>130.000.000</td>
                  <td>N/A</td>
                  <td>N/A</td>
                </tr>
                <tr>
                  <td>Seed Investor </td>
                  <td>4%</td>
                  <td>40.000.000</td>
                  <td>$0.005</td>
                  <td>$5.000.000</td>
                </tr>
                <tr>
                  <td>Public Sale </td>
                  <td>4%</td>
                  <td>40.000.000</td>
                  <td>$0.015</td>
                  <td>$15.000.000</td>
                </tr>
                <tr>
                  <td>Total </td>
                  <td>100%</td>
                  <td>1.000.000.000</td>
                  <td />
                  <td />
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <Text type="h3" className={styles.subtitle}>
              Vesting Schedule - Public Sale
            </Text>
            <Text type="p" className={styles.description}>
              {/* {project.contractAddress} */}
              100% at TGE
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
});
