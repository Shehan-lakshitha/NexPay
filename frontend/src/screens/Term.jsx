import React from 'react';
import COLORS from '../constants/colors';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import NavBar from '../components/NavBar';

const Term = () => {
  const navigation = useNavigation();
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" size={24} color={COLORS.black} />
          </TouchableOpacity>

          <Text style={styles.headertitle}>Terms & conditions</Text>
        </View>
        <ScrollView>
          <Text style={styles.paragraph}>
            {`Thank you for choosing Nexpay e-Wallet. These terms and policies ("Terms") outline the legal agreement between you ("User," "you," or "your") and Nexpay ("Nexpay," "we," "us," or "our") regarding your use of the Nexpay e-Wallet platform, its services, and related features (collectively referred to as the "Service"). By using the Nexpay e-Wallet, you agree to comply with and be bound by these Terms. Please read them carefully.\n\nAccount Creation and Usage\n\n1.1 Eligibility: To use the Nexpay e-Wallet, you must be at least 18 years old and capable of entering into a binding contract. By creating an account, you represent and warrant that you meet these eligibility requirements.\n\n1.2 Account Registration: You agree to provide accurate and complete information during the registration process. You are solely responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized use or suspected security breaches.\n\n1.3 Prohibited Activities: You agree not to engage in any illegal, fraudulent, or unauthorized activities while using the Nexpay e-Wallet. This includes but is not limited to money laundering, terrorist financing, identity theft, and any other activity that violates applicable laws or regulations. Transactions and Funds\n\n2.1 Transaction Authorization: By using the Nexpay e-Wallet, you authorize us to initiate and process transactions on your behalf, including sending and receiving funds, as instructed by you through the Service. You are responsible for ensuring the accuracy of transaction details before confirming them.\n\n2.2 Funding Sources: You may link your Nexpay e-Wallet to approved funding sources, such as bank accounts or credit cards, to facilitate transactions. By adding a funding source, you represent and warrant that you are the owner or authorized user of the account or card.\n\n2.3 Fees: Certain transactions or services may be subject to fees, which will be clearly disclosed to you before completing the transaction. You are responsible for any fees associated with your use of the Nexpay e-Wallet. Privacy and Security\n\n3.1 Privacy: We respect your privacy and are committed to protecting your personal information. Please refer to our Privacy Policy for details on how we collect, use, and safeguard your data.\n\n3.2 Security: We implement industry-standard security measures to protect your account and transactions. However, you acknowledge that no system is completely secure, and we cannot guarantee the absolute security of your information. You agree to use the Nexpay e-Wallet at your own risk. Intellectual Property\n\n4.1 Ownership: The Nexpay e-Wallet, its content, and all associated intellectual property rights are owned by Nexpay or its licensors. You agree not to reproduce, modify, distribute, or create derivative works based on the Nexpay e-Wallet without our prior written consent. Termination\n\n 5.1 Termination by You: You may terminate your Nexpay e-Wallet account at any time by following the instructions provided within the Service.\n\n5.2 Termination by Nexpay: We reserve the right to suspend or terminate your account and access to the Nexpay e-Wallet, in whole or in part, at our discretion and without prior notice. Termination may occur due to non-compliance with these Terms, fraudulent activities, or other reasons. Disclaimer of Liability\n\n6.1 Limitation of Liability: To the fullest extent permitted by law, Nexpay shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of or in connection with your use of the Nexpay e-Wallet or these Terms. Governing Law and Dispute Resolution\n\n7.1 Governing Law: These Terms shall be governed by and construed in accordance with the laws of [insert jurisdiction], without regard to its conflict of law principles.\n\n7.2 Dispute Resolution: Any disputes arising from or related to these Terms shall be resolved through negotiation and, if necessary, through binding arbitration in accordance with the rules of [insert arbitration provider]. Each party shall bear its own costs associated with the dispute resolution process. Changes to the Terms\n\n8.1 Modifications: We reserve the right to modify or update these Terms at any time. We will notify you of any material changes by posting the updated Terms within the Nexpay e-Wallet or through other means of communication. By continuing to use the Nexpay e-Wallet after the effective date of the modifications, you accept and agree to be bound by the revised Terms. If you have any questions or concerns regarding these Terms or the Nexpay e-Wallet, please contact our customer support team. `}
          </Text>
        </ScrollView>
      </SafeAreaView>
      <NavBar />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 22,
    marginTop: 22,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  paragraph: {
    paddingHorizontal: 20,
    color: COLORS.black,
    marginTop: 20,
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Poppins',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  headertitle: {
    color: COLORS.black,
    fontFamily: 'Poppins',
    fontSize: 18,
    fontWeight: '600',
    fontWeight: 'bold',
    marginHorizontal: '25%',
  },
});
export default Term;
