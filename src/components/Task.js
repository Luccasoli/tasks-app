import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import moment from "moment";
import "moment/locale/pt-br";
import commonStyles from "../";

export default props => {
	let check = null;
	if (props.doneAt !== null) {
		check = (
			<View style={styles.done}>
				<Icon
					name="check"
					size={20}
					color={commonStyles.colors.secondary}
				/>
			</View>
		);
	}
};
