package com.pikka.snmp;

import android.widget.Toast;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.Promise;

import org.snmp4j.CommunityTarget;
import org.snmp4j.PDU;
import org.snmp4j.Snmp;
import org.snmp4j.TransportMapping;
import org.snmp4j.event.ResponseEvent;
import org.snmp4j.mp.SnmpConstants;
import org.snmp4j.smi.Integer32;
import org.snmp4j.smi.OID;
import org.snmp4j.smi.OctetString;
import org.snmp4j.smi.Variable;
import org.snmp4j.smi.UdpAddress;
import org.snmp4j.smi.VariableBinding;
import org.snmp4j.transport.DefaultUdpTransportMapping;

import java.util.Map;
import java.util.HashMap; 

public class SnmpService extends ReactContextBaseJavaModule {
  // snmpget -v1 -c private 172.16.100.2 1.3.6.1.4.1.19865.1.2.1.1.0
  // snmpset -v1 -c private 172.16.100.2 1.3.6.1.4.1.19865.1.2.1.1.0 int 1
  private static final String DURATION_SHORT_KEY = "SHORT";
  private static final String DURATION_LONG_KEY = "LONG";

  public SnmpService(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override public String getName() { 
    return "SnmpService"; 
  }

  @Override public Map<String, Object> getConstants() {
    final Map<String, Object> constants = new HashMap<>(); 
    constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT); 
    constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG); 

    return constants; 
  }

  @ReactMethod public void show(String  ipAddress, 
                                String  port, 
                                String  oid, 
                                String    snmpVersion, 
                                String  community, 
                                Promise promise) { 
    String resp = ""; 
    int toggleState = 0; 
    try {
      System.out.println("SNMP GET Demo");

      // Create TransportMapping and Listen
      TransportMapping transport = new DefaultUdpTransportMapping();
      transport.listen();

      // Create Target Address object
      CommunityTarget comtarget = new CommunityTarget();
      comtarget.setCommunity(new OctetString(community));
      comtarget.setVersion(Integer.parseInt(snmpVersion));
      comtarget.setAddress(new UdpAddress(ipAddress + "/" + port));
      comtarget.setRetries(2);
      comtarget.setTimeout(1000);

      // Create the PDU object
      PDU pdu = new PDU();
      pdu.add(new VariableBinding(new OID(oid)));
      pdu.setType(PDU.GET);
      pdu.setRequestID(new Integer32(1));

      // Create Snmp object for sending data to Agent
      Snmp snmp = new Snmp(transport);

      System.out.println("Sending Request to Agent...");
      ResponseEvent response = snmp.get(pdu, comtarget);

      // Process Agent Response
      if (response != null)
      {
        System.out.println("Got Response from Agent");
        PDU responsePDU = response.getResponse();

        if (responsePDU != null)
        {
          int errorStatus = responsePDU.getErrorStatus();
          int errorIndex = responsePDU.getErrorIndex();
          String errorStatusText = responsePDU.getErrorStatusText();

          if (errorStatus == PDU.noError)
          {
            toggleState = responsePDU.getVariableBindings().firstElement().getVariable().toInt();
            resp = "Snmp Get Response = " + toggleState;
            System.out.println(resp);
          }
          else
          {
            resp = "Error: Request Failed";
            Toast.makeText(getReactApplicationContext(), resp, 1000).show();
            System.out.println(resp);
            System.out.println("Error Status = " + errorStatus);
            System.out.println("Error Index = " + errorIndex);
            System.out.println("Error Status Text = " + errorStatusText);
          }
        }
        else
        {
          resp = "Error: Response PDU is null";
          Toast.makeText(getReactApplicationContext(), resp, 1000).show();
          System.out.println(resp);
        }
      }
      else
      {
        resp = "Error: Agent Timeout... ";
        Toast.makeText(getReactApplicationContext(), resp, 1000).show();
        System.out.println(resp);
      }
      snmp.close();
    } catch (Throwable t) {
      Toast.makeText(getReactApplicationContext(), t.getMessage(), 1000).show();
    }

    promise.resolve(toggleState);
  }


  @ReactMethod public void toggleState(String  ipAddress, 
                                      String  port, 
                                      String  oid, 
                                      String    snmpVersion, 
                                      String  community, 
                                      int state, 
                                      Promise promise) { 
    String resp = ""; 
    int toggleState = 0; 
    try {
        
      System.out.println("SNMP SET Demo");

      // Create TransportMapping and Listen
      TransportMapping transport = new DefaultUdpTransportMapping();
      transport.listen();

      // Create Target Address object
      CommunityTarget comtarget = new CommunityTarget();
      comtarget.setCommunity(new OctetString(community));
      comtarget.setVersion(Integer.parseInt(snmpVersion));
      comtarget.setAddress(new UdpAddress(ipAddress + "/" + port));
      comtarget.setRetries(2);
      comtarget.setTimeout(1000);

      // Create the PDU object
      PDU pdu = new PDU();
     
      // Setting the Oid and Value for sysContact variable
      Variable var = new Integer32(state);
      VariableBinding varBind = new VariableBinding(new OID(oid),var);
      pdu.add(varBind);
     
      pdu.setType(PDU.SET);
      pdu.setRequestID(new Integer32(1));

      // Create Snmp object for sending data to Agent
      Snmp snmp = new Snmp(transport);
      ResponseEvent response = snmp.set(pdu, comtarget);

      // Process Agent Response
      if (response != null)
      {
        System.out.println("\nResponse:\nGot Snmp Set Response from Agent");
        PDU responsePDU = response.getResponse();

        if (responsePDU != null)
        {
          int errorStatus = responsePDU.getErrorStatus();
          int errorIndex = responsePDU.getErrorIndex();
          String errorStatusText = responsePDU.getErrorStatusText();

          if (errorStatus == PDU.noError)
          {
            System.out.println("Snmp Set Response = " + responsePDU.getVariableBindings());
          }
          else
          {
            resp = "Error: Request Failed";
            System.out.println(resp);
            Toast.makeText(getReactApplicationContext(), resp, 1000).show();
            System.out.println("Error Status = " + errorStatus);
            System.out.println("Error Index = " + errorIndex);
            System.out.println("Error Status Text = " + errorStatusText);
          }
        }
        else
        {
          resp = "Error: Response PDU is null";
          System.out.println(resp);
          Toast.makeText(getReactApplicationContext(), resp, 1000).show();
        }
      }
      else
      {
          resp = "Error: Agent Timeout... ";
          System.out.println(resp);
          Toast.makeText(getReactApplicationContext(), resp, 1000).show();
      }
      snmp.close();
    } catch (Throwable t) {
      Toast.makeText(getReactApplicationContext(), t.getMessage(), 1000).show();
    }

    promise.resolve(toggleState);
  }
}