import React, { ReactNode } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { Text, Title, Paragraph, Divider } from "react-native-paper";

type SectionProps = {
  title: string;
  children: ReactNode;
};

const GameRules = () => {
  return (
    <ScrollView style={styles.container}>
      <Title style={styles.title}>Okey 101 Oyun Kuralları</Title>

      <Section title="Oyun Hakkında">
        <Paragraph style={styles.paragraph}>
          <Text>
            <Text style={styles.paragraphStart}>🔹</Text>
            Okey 101, dört oyuncu ile oynanan ve birçok turdan oluşan keyifli
            bir masa oyunudur. Oyunun temel amacı, en az puanla oyunu
            tamamlamaktır. Tüm turların sonunda en az ceza puanına sahip olan
            oyuncu oyunu kazanır. Taşlar üzerindeki sayılar oyuncuların puanını
            belirler (Örneğin: Kırmızı 3 = 3 puan, Siyah 11 = 11 puan).
          </Text>
        </Paragraph>
      </Section>
      <Divider style={styles.divider} />

      <Section title="Oyunun Bitişi">
        <Paragraph style={styles.paragraph}>
          <Text>
            <Text style={styles.paragraphStart}>🔹</Text>
            Oyun, destedeki taşlar tükenene kadar ya da bir oyuncunun elini
            tamamlamasıyla sona erer. Oyun, genellikle belirli tur sayısına göre
            oynanır (örneğin: 3, 5, 7, 9 ya da 11 tur). Her bir tur, bir
            oyuncunun elini tamamlayıp oyunu bitirmesiyle son bulur.
          </Text>
        </Paragraph>
      </Section>
      <Divider style={styles.divider} />

      <Section title="Oyunun Başlangıcı">
        <Paragraph style={styles.paragraph}>
          <Text>
            <Text style={styles.paragraphStart}>🔹</Text>
            Bir oyuncu dağıtıcı olarak seçildikten sonra, dağıtıcı her oyuncuya
            21 taş verir ve kendine 22 taş alır. Geriye kalan taşlar masada ters
            çevrilmiş şekilde durur ve bir taş açık bırakılarak o taş jokeri,
            yani <Text style={styles.highlight}>OKEY Taşını</Text> belirler.
            Oyun saat yönünün tersine doğru oynanır.
          </Text>
        </Paragraph>
      </Section>
      <Divider style={styles.divider} />

      <Section title="Joker (Okey Taşı)">
        <Paragraph style={styles.paragraph}>
          <Text>
            <Text style={styles.paragraphStart}>🔹</Text>
            Jokeri (okey taşını) belirleyen taş her oyunda değişir. İki joker
            taşı (sahte joker olarak da adlandırılır) açık duran taşın bir üstü
            sayıyı temsil ederler. Sahte joker diğer standart taşlardan farklı
            bir görünüme sahiptir.
          </Text>
        </Paragraph>
      </Section>
      <Divider style={styles.divider} />

      <Section title="Perler ve El Açmak">
        <Paragraph style={styles.paragraph}>
          <Text>
            <Text style={styles.paragraphStart}>🔹</Text>
            El açmak için en az 101 sayınız olmalıdır. El açmak için elinizde
            aynı numaralı değişik renklerden 3 veya 4 adet set (örnek olarak
            siyah 5, kırmızı 5 ve bir tane de mavi 5) veya aynı renklerden
            sıralı sayı seti (örnek olarak kırmızı 7,8,9) olmalıdır.
          </Text>
        </Paragraph>

        <Paragraph style={styles.paragraph}>
          <Text>
            <Text style={styles.paragraphStart}>🔹</Text>
            Oyuncu elini ilk kez açtığı esnada 6 tane taşı yan yana koyamaz.
            (örnek olarak 4, 5, 6, 7, 8, 9). Bunun yerine iki ayrı per
            yapmalıdır.
          </Text>
        </Paragraph>
      </Section>
      <Divider style={styles.divider} />

      <Section title="Puanlama">
        <Paragraph style={styles.paragraph}>
          <Text>
            <Text style={styles.paragraphStart}>🔹</Text>
            Oyunculardan biri elindeki tüm taşları oynayarak oyun turunu
            bitirirse bu oyuncu -101 puan alır. Diğer oyunculara ise istekasında
            kalan taşların değeri kadar ceza puanı yazılır.
          </Text>
        </Paragraph>

        <Paragraph style={styles.paragraph}>
          <Text>
            <Text style={styles.paragraphStart}>🔹</Text>
            Oyuncu eğer hiçbir yere işlemeden elindeki sayıların hepsini per
            yapıp son taşı da masaya atarsa bu oyuncu -202 puan alır. Masadaki
            diğer herkes normalde alacağı puanın iki katını alır.
          </Text>
        </Paragraph>

        <Paragraph style={styles.paragraph}>
          <Text>
            <Text style={styles.paragraphStart}>🔹</Text>
            Oyuncunun bittiği anda masaya attığı son taş eğer okey ise bu oyuncu
            normalde alacağı - puanın iki katını alır. Masadaki diğer herkes
            normalde alacağı puanın iki katını alır.
          </Text>
        </Paragraph>
      </Section>
      <Divider style={styles.divider} />

      <Section title="Ceza Puanları">
        <Paragraph style={styles.paragraph}>
          <Text>
            <Text style={styles.paragraphStart}>🔹</Text>
            Oyuncular aşağıda belirtilen durumlarda ekstra 101 ceza puanı
            alırlar. Bu ceza puanları tur sonunda aldıkları puanlara eklenir.
            Örneğin, oyuncu elindeki tüm taşları açmış ancak 101 sayısına
            ulaşamamışsa ceza alır.
          </Text>
        </Paragraph>

        <Paragraph style={styles.paragraph}>
          <Text>
            <Text style={styles.paragraphStart}>🔹</Text>
            Oyuncu yan tarafa işlek taş atarsa 101 ceza puanı alır. Aynı şekilde
            okey taşını da atarsa 101 ceza puanı alır.
          </Text>
        </Paragraph>

        <Paragraph style={styles.paragraph}>
          <Text>
            <Text style={styles.paragraphStart}>🔹</Text>
            Oyuncu yan tarafa bir taş atar ve o taşı alan oyuncu o taşı per
            yaparsa, taşı atan oyuncu attığı sayı değerinin 10 katı kadar ceza
            puanı alır.
            Eğer o taşı alan oyuncu çift açarsa ceza puanı 20 katına çıkar.
          </Text>
        </Paragraph>
      </Section>

      <Divider style={styles.divider} />

      <Section title="Ödül Sistemi">
        <Paragraph style={styles.paragraph}>
          <Text>
            <Text style={styles.paragraphStart}>🔹</Text>
            Her yerde geçerli olmasa dahi bazı oyunlarda bir kaç durumda oyunculara ödül verilir.
            Bir oyuncu elini açtığında sayı toplam sayı değeri 150 (50 * 3) ve üzeri ise bu youncu 100 puan ödül alır.
            Bir oyuncu elini 7 ve daha yukarı çift açtığında bu oyuncu 100 puan ödül alır.
          </Text>
        </Paragraph>

        <Paragraph style={styles.paragraph}>
          <Text>
            <Text style={styles.paragraphStart}>🔹</Text>
            Bir oyuncu elini açtığında sayı toplam sayı değeri 150 (50 * 3) ve üzeri ise bu youncu 100 puan ödül alır.
          </Text>
        </Paragraph>

        <Paragraph style={styles.paragraph}>
          <Text>
            <Text style={styles.paragraphStart}>🔹</Text>
            Bir oyuncu elini 7 ve daha yukarı çift açtığında bu oyuncu 100 puan ödül alır.
          </Text>
        </Paragraph>
      </Section>
    </ScrollView>
  );
};

const Section = ({ title, children }: SectionProps) => (
  <View style={styles.section}>
    <Title style={styles.sectionTitle}>{title}</Title>
    {children}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f7f7f7",
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: "center",
  },
  section: {
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: 8,
    color: "#3a3a3a",
  },
  paragraph: {
    fontSize: 16,
    color: "#555555",
    marginBottom: 12,
  },
  highlight: {
    fontWeight: "bold",
    color: "#d9534f",
  },
  divider: {
    marginVertical: 12,
  },
  paragraphStart: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#007AFF",
  },
});

export default GameRules;
